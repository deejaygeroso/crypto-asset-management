import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../containers/Navbar';
import FormStyle from './portfolio/FormStyle';
import { TextInput, NumberInput, TextArea } from './forms';

import Cookies from 'js-cookie';
import Select from 'react-select';

class PortfolioAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            amount: 0,
            crypto: {},
            buy_price_usd: 0,
            buy_price_btc: 0,
            buy_price_eth: 0,
            notes : '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleChangeSelect2 = this.handleChangeSelect2.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentWillUnmount(){
        const { portfolioActions } = this.props
        portfolioActions.itemClear();
        portfolioActions.successClear();
        portfolioActions.errorClear();
    }

    componentDidMount(){
        const { portfolio, userActions, cryptoIdsActions } = this.props;
        const userCookie = Cookies.get('user');

        cryptoIdsActions.cryptoIdsFindAll();

        // if user has no cookie redirect to login
        if(!userCookie){
            Router.push('/login');
        }else{
            const params = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            if(params && params._id){
                if(params._id) userActions.userFind({params});
            }else{
                Router.push('/login');
            }
        }

        this.setState({
            amount          : portfolio && portfolio.amount        ? portfolio.amount        : 0,
            buy_price_usd   : portfolio && portfolio.buy_price_usd ? portfolio.buy_price_usd : 0,
            buy_price_btc   : portfolio && portfolio.buy_price_btc ? portfolio.buy_price_btc : 0,
            buy_price_eth   : portfolio && portfolio.buy_price_eth ? portfolio.buy_price_eth : 0,
            notes           : portfolio && portfolio.notes         ? portfolio.notes         : '',
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

                            <p>Add Coin to your Portfolio</p>
                           <form className="form-signin">

                               {
                                    portfolioError && portfolioError.message ?
                                    <div className="bounceIn animated">
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

                                <label className="input-lable">Coin*</label>
                                <Select
                                    name="form-field-name"
                                    value={this.state.crypto}
                                    onChange={this.handleChangeSelect2}
                                    multi={false}
                                    options={cryptoIds}
                                    placeholder="Select your favourite(s)"
                                    className="select-field"
                                />

                                <NumberInput id="amount" value={this.state.amount} label="Amount" placeholder="Amount" onValueChange={this.onValueChange} />

                                {/* ------ Buy Price ------ */}
                                <div className="buy-price-wrapper row">
                                    <div className="col-md-4">
                                        <NumberInput id="buy_price_usd" value={this.state.buy_price} label="Buy Price (USD)" placeholder="Buy Price USD" onValueChange={this.onValueChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <NumberInput id="buy_price_btc" value={this.state.buy_price} label="Buy Price (BTC)" placeholder="Buy Price BTC" onValueChange={this.onValueChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <NumberInput id="buy_price_eth" value={this.state.buy_price} label="Buy Price (ETH)" placeholder="Buy Price ETH" onValueChange={this.onValueChange} />
                                    </div>
                                </div>

                                <TextArea id="notes" value={this.state.notes} label="Notes" placeholder="Notes" onValueChange={this.onValueChange} />

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

    /* ----------------------------------------------------------------------------------
     * Update state when input value has changed
     * -------------------------------------------------------------------------------- */
    onValueChange(key, value){
        let inputData = []
        inputData[key] = value;
        this.setState(inputData);
    }

    /* ----------------------------------------------------------------------------------
     * When user press submit button
     * -------------------------------------------------------------------------------- */
    onSubmit(evt){
        evt.preventDefault();
        const { user, portfolio, portfolioActions } = this.props;
        const { amount, crypto, buy_price, description } = this.state;

        if( crypto.id==="" && crypto.value==="" && crypto.label==="" ){
            portfolioActions.errorSet({ payload: { message: 'Please select a coin first' } });
            portfolioActions.successClear();
            return;
        }

        if(portfolio._id){
            portfolioActions.itemUpdate({
                _id: portfolio._id,
                params: Object.assign({}, this.state, {user_id: user._id}),
            })
        }else{
            portfolioActions.itemCreate({
                params: Object.assign({}, this.state, {user_id: user._id}),
            });
        }
        Router.push('/portfolio/list');
    }

    /* ----------------------------------------------------------------------------------
     * When trying to update portfolio user can remove that item by pressing the delete button
     * -------------------------------------------------------------------------------- */
    onRemove(evt){
        evt.preventDefault();
        const { portfolio, portfolioActions } = this.props;
        portfolioActions.itemRemove({_id: portfolio._id});
        Router.push('/portfolio/list');
    }

}

PortfolioAdd.propTypes = {
    user             : PropTypes.object,
    userActions      : PropTypes.object,
    portfolio        : PropTypes.object,
    portfolioError   : PropTypes.object,
    portfolioSuccess : PropTypes.object,
    portfolioActions : PropTypes.object,
    cryptoIds        : PropTypes.array,
    cryptoIdsActions : PropTypes.object,
}

export default PortfolioAdd;
