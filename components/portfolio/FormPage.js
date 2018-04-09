import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../../containers/Navbar';
import FormStyle from '../styles/FormStyle';
import { NumberInput, TextArea } from '../forms';

import { confirmAlert } from 'react-confirm-alert'; // Import

import Select from 'react-select';

class FormPage extends Component{

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

    /* ----------------------------------------------------------------------------------
     * Clear all when unmounted
     * -------------------------------------------------------------------------------- */
    componentWillUnmount(){
        const { portfolioActions } = this.props
        portfolioActions.itemClear();
        portfolioActions.successClear();
        portfolioActions.errorClear();
    }

    /* ----------------------------------------------------------------------------------
     * Update the fields of the form
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { portfolio } = this.props;

        this.setState({
            amount          : portfolio && portfolio.amount        ? portfolio.amount        : 0,
            buy_price_usd   : portfolio && portfolio.buy_price_usd ? portfolio.buy_price_usd : 0,
            buy_price_btc   : portfolio && portfolio.buy_price_btc ? portfolio.buy_price_btc : 0,
            buy_price_eth   : portfolio && portfolio.buy_price_eth ? portfolio.buy_price_eth : 0,
            notes           : portfolio && portfolio.notes         ? portfolio.notes         : '',
            crypto : {
                id     : portfolio && portfolio.id     ? portfolio.id     : '',
                value  : portfolio && portfolio.value  ? portfolio.value  : '',
                label  : portfolio && portfolio.label  ? portfolio.label  : '',
                symbol : portfolio && portfolio.symbol ? portfolio.symbol : '',
            },
        })

    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { cryptoIds, portfolio, portfolioError } = this.props;
        const addUpdateButtonName = portfolio && portfolio._id ? 'Update' : 'Create';
        return(
            <div className="page-container">
                <Navbar />
                <div className="card container flex-column align-items-center justify-content-center ">

                    <div className="fadeIn animated">
                       <div className=".card-profile">

                            <p className="form-title">Add Coin to your Portfolio</p>
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
                                    // arrowRenderer={()=><div>hell</div>}
                                    // valueRenderer={(crypto)=>(
                                    //     <div>
                                    //         {crypto.value}
                                    //     </div>
                                    // )}
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
                                    <div className="col-md-4 col-sm-4">
                                        <NumberInput id="buy_price_usd" value={this.state.buy_price_usd} label="Buy Price (USD)" placeholder="Buy Price USD" onValueChange={this.onValueChange} />
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <NumberInput id="buy_price_btc" value={this.state.buy_price_btc} label="Buy Price (BTC)" placeholder="Buy Price BTC" onValueChange={this.onValueChange} />
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <NumberInput id="buy_price_eth" value={this.state.buy_price_eth} label="Buy Price (ETH)" placeholder="Buy Price ETH" onValueChange={this.onValueChange} />
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

    /* ----------------------------------------------------------------------------------
     * Handle dropdown Select 2
     * -------------------------------------------------------------------------------- */
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
        const { user, portfolio, portfolioActions, portfolioMainPageRouteName, onSubmit } = this.props;
        const { crypto } = this.state;

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

        if(portfolioMainPageRouteName==='/admin/userportfolio'){
            return onSubmit();
        }

        Router.push(portfolioMainPageRouteName);
    }

    /* ----------------------------------------------------------------------------------
     * When trying to update portfolio user can remove that item by pressing the delete button
     * -------------------------------------------------------------------------------- */
    onRemove(evt){
        evt.preventDefault();

        confirmAlert({
            title: 'Are you sure?',
            message: 'You are about to delete this Coin.',
            buttons: [
              {
                label: 'Delete',
                onClick: () => {
                    const { portfolio, portfolioActions, portfolioMainPageRouteName } = this.props;
                    portfolioActions.itemRemove({_id: portfolio._id});
                    Router.push(portfolioMainPageRouteName);
                }
            },
            {
                label: 'Cancel',
                onClick: () => {}
            }
        ]
    })
    }

}

FormPage.propTypes = {
    portfolioMainPageRouteName : PropTypes.string,
    user             : PropTypes.object,
    userActions      : PropTypes.object,
    portfolio        : PropTypes.object,
    portfolioError   : PropTypes.object,
    portfolioSuccess : PropTypes.object,
    portfolioActions : PropTypes.object,
    cryptoIds        : PropTypes.array,
    cryptoIdsActions : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
    onSubmit : PropTypes.func,
}

export default FormPage;
