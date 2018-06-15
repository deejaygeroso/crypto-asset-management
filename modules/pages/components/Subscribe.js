import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { toasterErrorMessage } from '../../lib/helpers';

import Cookies from 'js-cookie';
var Coinpayments = require('coinpayments');
var client = new Coinpayments({
    key: 'cc43cf1385d812a582569cdbc11d188cae7ba2eb999acd0a1597564b3d2be106',
    secret: 'a908f43c31F7bc07d03B50247399f9fbf48c6965068b88dD01374AE93f381b36',
    autoIpn: true,
}); 

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            user: {},
            currency2: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.coinForPaymentSelected = this.coinForPaymentSelected.bind(this);
    }

    componentDidMount() {
        const { userActions } = this.props;
        // just fetch user based on stored cookie
        const userCookie = Cookies.get('user');
        if(userCookie){
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            this.setState({user});
            if(user && user._id){
                if(user._id){
                    userActions.itemFind({
                        params: {
                            _id: user._id
                        }
                    });
                }
            }
        }
    }

    componentWillUnmount(){
        this.props.userActions.errorClear()
    }

    renderSignupForm(){
        const { user } = this.props;
        return(
            <div className="d-flex justify-content-center">
               <div className="">
                    <img className="coinpayments" src="/static/images/coinpayments.png" width="260"/>
                    <div className="mt-15 mr-15 mb-15 ml-15">
                        <div className="text-label premium">Premium<span className="premium-price">4.99 USD</span></div>
                    </div>
                    <div className="mt-15 mr-15 mb-15 ml-15">
                        <div className="text-label">{user.email || "N/A"}</div>
                    </div>
                    <div className="row ml-0 mr-0 mb-40">
                        <div className="col-md-6">
                            <div className="text-label">
                                {user.firstname || "N/A"}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-label">
                                {user.lastname || "N/A"}
                            </div>
                        </div>
                    </div>
                    <h3 className="coinpayment-select-payment-title">Select Coin as Payment</h3>
                    <form className="form-signin formField">
                        <div className="d-flex align-content-center flex-wrap justify-content-center">
                            {this.renderSelectCoin('BTC', 'Bitcoin')}
                            {this.renderSelectCoin('ETH', 'Etherium')}
                            {this.renderSelectCoin('DASH', 'Dash')}
                            {/* {this.renderSelectCoin('LTC', 'Litecoin')} */}
                            {/* {this.renderSelectCoin('XRP', 'Ripple')} */}
                        </div>
                        <hr/>
                        <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-signin" type="button" >Subscribe</button>
                        <div>
                        <p>Upon pressing the Subscribe button you will be then given a link to coinpayments page for your transaction info.</p>
                        </div>
                    </form>
                </div>
             </div>
        )
    }

    renderSelectCoin(symbol, name){
        const { currency2 } = this.state;
        let classNameForSelectCoin = `crypto-select d-flex align-items-center`;
        if(currency2===symbol){
            classNameForSelectCoin = classNameForSelectCoin + ' crypto-select-active';
        }
        return(
            <div className={classNameForSelectCoin} onClick={()=>this.coinForPaymentSelected(symbol)}>
                <img src={`/static/icon/${symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="60" width="60" />
                <div className="d-flex flex-column">
                    <h1>{symbol}</h1>
                    <span>{name}</span>
               </div>
            </div>
        )
    }

    renderUserTransaction(){
        const { transaction } = this.props;
        return(
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <img className="coinpayments" src="/static/images/coinpayments.png" width="260"/>
                    <hr/>
                    <p>Please pay your subscription fees before your transaction time runs out.</p>
                    <a href={transaction.qrcode_url} target="_blank">QR Code</a>
                    <a href={transaction.status_url} target="_blank">Transaction Status</a>
                    <Link prefetch href="/portfolio/list"><a className="subscribe" href="">Go Back</a></Link>
                </div>
            </div>
        )
    }

    render(){
        const { user, transaction } = this.props;
        if(!(user && user._id)){
            return(
                <div>
                   <div className="gradient-header"></div>
                   loading
                </div>
            )
        }

        return(
            <div>
                <div className="gradient-header"></div>
                <ToastContainer />
                
                {/* must fix the glitch on ui later */}
                { user && user.txn_id && transaction && transaction._id ? this.renderUserTransaction() : this.renderSignupForm() }

                {this.renderStyles()}
            </div>
        )
    }

    coinForPaymentSelected(currency2){
        this.setState({currency2})
    }

    onChange(key, value){
        let inputData = []
        inputData[key] = value;
        this.setState(inputData);
    }

    onSubmit(evt){
        evt.preventDefault();
        const { user, userActions, itemActions } = this.props;
        const { email, firstname, lastname, currency2 } = this.state;
        const options = {
            buyer_email: email,
            buyer_name: `${firstname} ${lastname}`,
            currency1: 'USD',
            currency2: currency2,
            amount: 4.99,
        }

        if(currency2===''){
            return toasterErrorMessage('You must select a coin for payment first!')
        }

        if(currency2){
            client.createTransaction(options ,(err,result) => {
                itemActions.apiCallCreate({
                    serviceName: 'transaction',
                    item: Object.assign({}, result, {user_id: user._id})
                })
    
                userActions.itemUpdate({
                    params: {
                        _id: user._id,
                        txn_id : result.txn_id,
                    }
                })
            });
        }

        // if(email==='' || password===''){
        //     this.setState({password: ''});
        //     return userActions.errorSet({
        //         payload: {
        //             message: 'Please fill out the fields!',
        //         }
        //     })
        // }

        // this.setState({password: ''});
        // userActions.login({
        //     params: {
        //         email,
        //         password,
        //     }
        // });

    }

    renderStyles(){
        return(
            <style jsx global>{`
                    .crypto-select{
                        margin: 2px;
                        width: 180px;
                        line-height: 1;
                        box-shadow: 2px 2px 5px #888;
                        background-color: #fff;
                        cursor: pointer;
                        border-radius: 5px;
                        padding: 14px;
                    }
                    .crypto-select:hover{
                        box-shadow: 4px 4px 12px #888;
                    }
                    .crypto-select > div{
                        padding-left: 15px;
                    }
                    .crypto-select > div > h1{
                        padding: 0;
                        margin: 0;
                    }
                    .crypto-select > div > span{
                        padding: 0;
                        margin: 0;
                        color: #888;
                    }
                    .crypto-select-active{
                        background-color: #52d3aa;
                    }
                    .crypto-select-active > div > span{
                        color: #fff;
                    }
                    .text-label{
                        background-color: #fff;
                        border: 1px solid #c7c2c2;
                        border-radius: 6px;
                        padding: 10px 15px;
                    }
                    .coinpayments{
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 30px;
                    }
                    .coinpayment-select-payment-title{
                        text-align: center;
                    }
                    .premium{
                        font-weight: 600;
                    }
                    .premium-price{
                        float: right;
                    }
          `}</style>
        )
    }

}

Login.propTypes = {
    user : PropTypes.object,
    transaction : PropTypes.object,
    userActions : PropTypes.object,
    itemActions : PropTypes.object,
}

export default Login;
