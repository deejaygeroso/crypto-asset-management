import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HomeNavbar from '../../core/components/HomeNavbar';

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
            toggleMobileViewNavbar : false,
            user: {},
            currency2: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.coinForPaymentSelected = this.coinForPaymentSelected.bind(this);
    }

    componentDidMount() {
        // just fetch user based on stored cookie
        const userCookie = Cookies.get('user');
        if(userCookie){
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            this.setState({user});
            // if(user && user._id){
            //     if(user._id){
            //         userActions.itemFind({
            //             params: {
            //                 _id: user._id
            //             }
            //         })
            //     }
            // }
        }
    }

    componentWillUnmount(){
        this.props.userActions.errorClear()
    }

    renderSignupForm(){
        const { userError } = this.props;
        return(
            <div className="login-page d-flex justify-content-center">
               <div className="card card-container">
                   {/*
                       <img className="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" />
                       <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                  */}
                    {/* <h1>Subscribe</h1> */}
                    <h3>Select Coin as Payment</h3>
                    <form className="form-signin formField">
                        <div className="d-flex align-content-center flex-wrap justify-content-center">
                            {this.renderSelectCoin('BTC', 'Bitcoin')}
                            {this.renderSelectCoin('ETH', 'Etherium')}
                            {this.renderSelectCoin('LTC', 'Litecoin')}
                            {this.renderSelectCoin('XRP', 'Ripple')}
                        </div>
                        <hr/>
                        <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-signin" type="button" >Subscribe</button>
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

    render(){
        const { toggleMobileViewNavbar } = this.state;
        return(
            <div>
                    <HomeNavbar toggleMobileViewNavbar={toggleMobileViewNavbar} onToggle={()=>this.setState({toggleMobileViewNavbar: !toggleMobileViewNavbar})}/>

                    <section id="fh5co-home" data-section="home" data-stellar-background-ratio="0.5">
                        <div className="gradient"></div>
                        <div className="container">
                            <div className="text-wrap display-grid">
                                <div className="margint-top-50">
                                    <div className="col-md-8 col-md-offset-2">
                                        {this.renderSignupForm()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


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
        // const { userActions } = this.props;
        const { email, firstname, lastname, password, currency2 } = this.state;
        const options = {
            buyer_email: email,
            buyer_name: `${firstname} ${lastname}`,
            currency1: 'USD',
            currency2: currency2,
            amount: 10,
        }

        // console.log('this.state.user', this.state.user)
        client.convertCoins({
            amount: 10,
            from: "USD",
            to: "BTC"
          }, function (err, response) {
              console.log('err', err)
            console.log('response', response)
          }) 
        // client.createTransaction(options ,function(err,result){
        //     console.log('err', err)
        //     console.log('result', result);
        // });

        // evt.preventDefault();

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
                    #fh5co-home{
                        height: 100vh;
                    }
                    .version-name{
                        font-size: 10px;
                        color: '#fff',
                    }
                    .card{
                        padding: 30px;
                        padding-bottom: 50px;
                        margin-top: 50px;
                        line-height: 1;
                        background-color: #fff;
                        box-shadow: 2px 2px 10px #888;
                        margin-top: 210px;
                        width: 580px;
                    }
                    .card-container{
                        max-width: 800px;
                    }
                    .formField{
                        margin-right: 15px;
                    }
                    .inputField{
                      margin: 10px;
                    }
                    .inputField-password{
                      margin-bottom: 10 !important;
                    }
                    .card-profile{
                      background-color: 'black';
                    }
                    .btn{
                      margin-left: 10px;
                    }
                    .password-label{
                      font-size: 12px;
                      pading: 0;
                      margin: 0;
                      margin-left: 14px;
                      padding-bottom: 12px !important;
                    }
                    .display-grid{
                        display: block !important;
                    }
                    .bs-component{
                        margin-left: 10px;
                        margin-right: -10px;
                    }
                    .bs-component > div {
                        margin-bottom: 10px;
                    }

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
          `}</style>
        )
    }

}

Login.propTypes = {
    userError : PropTypes.object,
    userActions : PropTypes.object,
}

export default Login;
