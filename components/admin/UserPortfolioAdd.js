import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../../containers/Navbar';
import FormStyle from '../portfolio/FormStyle';
import Select from 'react-select';


class UserPortfolioAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            amount: 0,
            crypto: {},
            buy_price: 0,
            description: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleChangeSelect2 = this.handleChangeSelect2.bind(this);
    }

    componentWillUnmount(){
        const { portfolioActions } = this.props
        portfolioActions.portfolioClear();
        portfolioActions.portfolioSuccessClear();
        portfolioActions.portfolioErrorClear();
    }

    componentDidMount(){
        const { user, portfolio, cryptoIdsActions } = this.props;

        if(!user._id && user.email===''){
            Router.push('/admin/manage')
        }

        cryptoIdsActions.cryptoIdsFindAll();

        this.setState({
            amount      : portfolio && portfolio.amount ? portfolio.amount : 0,
            buy_price   : portfolio && portfolio.buy_price ? portfolio.buy_price : 0,
            description : portfolio && portfolio.description ? portfolio.description : '',
            crypto : {
                id    : portfolio && portfolio.id ? portfolio.id : '',
                value : portfolio && portfolio.value ? portfolio.value : '',
                label : portfolio && portfolio.label ? portfolio.label : '',
            },
        })

    }

    render(){
        const { cryptoIds, portfolio, portfolioError } = this.props;
        const addUpdateButtonName = portfolio && portfolio._id ? 'Update' : 'Create';
        return(
            <div className="page-container">
                <Navbar />
                <div className="card container flex-column align-items-center justify-content-center ">

                    <div className="fadeIn animated">
                       <div className=".card-profile">

                           <form className="form-signin">

                               {
                                    portfolioError && portfolioError.message ?
                                    <div className="">
                                        <div className="bs-component">
                                            <div className="alert alert-dismissible alert-danger portfolio-error">
                                                {portfolioError.message}
                                            </div>
                                        </div>
                                    </div> : <div />
                                }

                               {/*
                                    portfolioSuccess && portfolioSuccess.message ?
                                    <div className="">
                                        <div className="bs-component">
                                            <div className="alert alert-dismissible alert-success">
                                                {portfolioSuccess.message}
                                            </div>
                                        </div>
                                    </div> : <div />
                                */}


                                <label className="input-lable">Coin</label>
                               <Select
                                    name="form-field-name"
                                    value={this.state.crypto}
                                    onChange={this.handleChangeSelect2}
                                    multi={false}
                                    options={cryptoIds}
                                    placeholder="Select your favourite(s)"
                                    className="select-field"
                                />
                                <label className="input-lable">Amount</label>
                               <input
                                    type="number"
                                    id="amount"
                                    step="any"
                                    value={this.state.amount}
                                    className="form-control inputField"
                                    placeholder="Amount"
                                    onChange={(evt)=>this.onChange('amount', evt)}/>
                                <label className="input-lable">Buy Price</label>
                                <input
                                    type="number"
                                    id="buy_price"
                                    step="any"
                                    value={this.state.buy_price}
                                    className="form-control inputField"
                                    placeholder="Buy Price"
                                    onChange={(evt)=>this.onChange('buy_price', evt)}/>
                                <label className="input-lable">Description</label>
                                <textarea
                                    id="description"
                                    className="form-control inputField textarea-field"
                                    placeholder="Description"
                                    value={this.state.description}
                                    rows="4"
                                    cols="50"
                                    onChange={(evt)=>this.onChange('description', evt)}/>
                                <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-submit" type="submit" >{addUpdateButtonName}</button>
                                {
                                    portfolio && portfolio._id ?
                                        <button onClick={this.onRemove} className="btn btn-lg btn-danger btn-block btn-signin" type="submit" >Remove</button>
                                    : <div />
                                }
                           </form>
                       </div>
                    </div>

                    <FormStyle />
                </div>

            </div>
        )
    }


    handleChangeSelect2(crypto){
		this.setState({ crypto });
    }

    onChange(key, evt){
        evt.preventDefault();
        let inputData = []
        inputData[key] = evt.target.value;
        this.setState(inputData);
    }

    onSubmit(evt){
        evt.preventDefault();
        const { user, userActions, portfolio, portfolioActions } = this.props;
        const { amount, crypto, buy_price, description } = this.state;

        // make sure amount and crypto is not empty
        if( !amount || Object.keys(crypto).length===0 || !buy_price || description==='' ){
            portfolioActions.portfolioErrorSet({ payload: { message: 'Fill in all the input first' } });
            portfolioActions.portfolioSuccessClear();
            return;
        }


        if(portfolio._id){
            portfolioActions.portfolioUpdate({
                _id: portfolio._id,
                params: Object.assign({}, this.state, {user_id: user._id}),
            })
        }else{
            portfolioActions.portfolioCreate({
                params: Object.assign({}, this.state, {user_id: user._id}),
            });
        }
        userActions.userFind({params: {_id: user._id}}); // so that data would not get lost when navigating back to list
        Router.push('/admin/userportfolio');
    }

    onRemove(evt){
        evt.preventDefault();
        const { user, userActions, portfolio, portfolioActions } = this.props;
        portfolioActions.portfolioRemove({_id: portfolio._id});
        userActions.userFind({params: {_id: user._id}}); // so that data would not get lost when navigating back to list
        Router.push('/admin/userportfolio');
    }


    renderStyle(){
        return(
            <style jsx global>{`
                    .card{
                        padding: 15px 30px 30px 30px;
                        padding-bottom: 50px;
                        margin-top: 50px;
                        line-height: 1;
                        box-shadow: 2px 2px 5px #888;
                        max-width: 680px;
                        margin-bottom: 120px;
                        margin-top: 80px;
                    }
                    .card-image-wrapper{
                        margin: 20px;
                    }
                    .inputField{
                      padding: 10px;
                      margin-left: 0px !important;
                      padding-left: 20px;
                    }
                    .Select{
                    }
                    .Select-control{
                        margin: 0px !important;
                        padding: 0px !important;
                        border-width: 0px;
                        margin-left: 10px !important;
                        margin-top: 5px !important;
                    }
                    .select-field{
                        border: 2px solid rgba(0, 0, 0, 0.1);
                        padding: 0 0 10px 0px;
                        padding-right: 10px;
                    }
                    .inputField-password{
                      margin-bottom: 10px !important;
                      margin-left: 0px !important;
                      padding-left: 20px;
                    }
                    .card-profile{
                      background-color: 'black';
                    }
                    .password-label{
                      font-size: 12px;
                      pading: 0;
                      margin: 0;
                      margin-left: 14px;
                      padding-bottom: 12px !important;
                  }
                    .btn-submit{
                        margin-top: 20px;
                    }
          `}</style>
        )
    }

}

UserPortfolioAdd.propTypes = {
    user             : PropTypes.object,
    userActions      : PropTypes.object,
    portfolio        : PropTypes.object,
    portfolioError   : PropTypes.object,
    portfolioSuccess : PropTypes.object,
    portfolioActions : PropTypes.object,
    cryptoIds        : PropTypes.array,
    cryptoIdsActions : PropTypes.object,
}

export default UserPortfolioAdd;
