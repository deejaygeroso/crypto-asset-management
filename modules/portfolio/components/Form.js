import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormStyle from '../styles/FormStyle';
import { TextInput, NumberInput, TextArea } from '../../lib/forms';

import { confirmAlert } from 'react-confirm-alert';
import Select from 'react-select';
import Cookies from 'js-cookie';
import { toasterErrorMessage } from '../../lib/helpers';

class Form extends Component{

    constructor(props){
        super(props);

        this.state = {
            amount: 0,
            crypto: {
                id: '',
                value: '',
                label: '',
                symbol: '',
            },
            cryptoCustom: {
                id: '',
                symbol: '',
            },
            buy_price_usd: 0,
            buy_price_btc: 0,
            buy_price_eth: 0,
            notes : '',

            isCustom: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleChangeSelect2 = this.handleChangeSelect2.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onCryptoValueChange = this.onCryptoValueChange.bind(this);
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
            isCustom        : portfolio && portfolio.isCustom      ? portfolio.isCustom      : false,
            crypto : {
                id     : portfolio && portfolio.id     ? portfolio.id     : '',
                value  : portfolio && portfolio.value  ? portfolio.value  : '',
                label  : portfolio && portfolio.label  ? portfolio.label  : '',
                symbol : portfolio && portfolio.symbol ? portfolio.symbol : '',
            },
            cryptoCustom : {
                id     : portfolio && portfolio.id     ? portfolio.id     : '',
                value  : portfolio && portfolio.value  ? portfolio.value  : '',
                label  : portfolio && portfolio.label  ? portfolio.label  : '',
                symbol : portfolio && portfolio.symbol ? portfolio.symbol : '',
            },
        })

    }

    /* ----------------------------------------------------------------------------------
     * Form Card
     * -------------------------------------------------------------------------------- */
    renderForm(){
        const { cryptoIds } = this.props;
        return(
            <form className="form-signin">
                {/* ------------------------------*/}
                {/* ------------ Coin ----------- */}
                {/* ------------------------------*/}
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
                <div style={{marginBottom: 15}} />

                {/* ------------------------------*/}
                {/* ----------- Amount ---------- */}
                {/* ------------------------------*/}
                <NumberInput id="amount" value={this.state.amount} label="Amount" placeholder="Amount" onValueChange={this.onValueChange} />

                {/* ------------------------------*/}
                {/* ---------- Buy Price -------- */}
                {/* ------------------------------*/}
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

                {/* ------------------------------*/}
                {/* ------------ Notes ---------- */}
                {/* ------------------------------*/}
                <TextArea id="notes" value={this.state.notes} label="Notes" placeholder="Notes" onValueChange={this.onValueChange} />
            </form>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Custom Form Card
     * -------------------------------------------------------------------------------- */
    renderCustomForm(){
        return(
            <form className="form-signin">

                {/* ------------------------------*/}
                {/* --------- Custom Coin ------- */}
                {/* ------------------------------*/}
                <div className="buy-price-wrapper row">
                    <div className="col-md-6 col-sm-6">
                        <TextInput id="id" value={this.state.cryptoCustom.id} label="Coin*" placeholder="Coin" onValueChange={this.onCryptoValueChange} />
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <TextInput id="symbol" value={this.state.cryptoCustom.symbol} label="Symbol*" placeholder="Symbol" onValueChange={this.onCryptoValueChange} />
                    </div>
                </div>

                {/* ------------------------------*/}
                {/* ----------- Amount ---------- */}
                {/* ------------------------------*/}
                <NumberInput id="amount" value={this.state.amount} label="Amount" placeholder="Amount" onValueChange={this.onValueChange} />

                {/* ------------------------------*/}
                {/* ---------- Buy Price -------- */}
                {/* ------------------------------*/}
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

                {/* ------------------------------*/}
                {/* ------------ Notes ---------- */}
                {/* ------------------------------*/}
                <TextArea id="notes" value={this.state.notes} label="Notes" placeholder="Notes" onValueChange={this.onValueChange} />
            </form>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { portfolio } = this.props;
        const { isCustom } = this.state;
        const addUpdateButtonName = portfolio && portfolio._id ? 'Update' : 'Create';
        const customButtonStyle = {background: '#64d6b1', color: '#fff'};
        return(
            <div className="page-container">
                <div className="card container flex-column align-items-center justify-content-center fadeIn animated">
                        {/* ------------------------------*/}
                        {/* --------- Form Title -------- */}
                        {/* ------------------------------*/}
                        <p className="form-title">
                            { addUpdateButtonName==='Create' ? "Add Coin to your Portfolio" : (this.state.isCustom ? "Custom Portfolio Coin" : "Portfolio Coin") }
                        </p>

                        {/* ------------------------------*/}
                        {/* ------ Selecting Custom ----- */}
                        {/* ------------------------------*/}
                        {
                            addUpdateButtonName==='Create'?
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <div className="btn" onClick={()=>this.setState({isCustom: false})} style={!isCustom ? customButtonStyle : {}}>Normal</div>
                                <div className="btn" onClick={()=>this.setState({isCustom: true})} style={isCustom ? customButtonStyle : {}}>Custom</div>
                            </div> : <div />
                        }

                        {/* ------------------------------*/}
                        {/* ---- Portfolio Coin Form ---- */}
                        {/* ------------------------------*/}
                        { !this.state.isCustom ? this.renderForm() : this.renderCustomForm() }

                        {/* ------------------------------*/}
                        {/* --- Submit & Remove Button -- */}
                        {/* ------------------------------*/}
                        {
                            addUpdateButtonName==='Create'? <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-submit" type="submit" >{addUpdateButtonName}</button> :
                            <div className="row">
                                <div className="col-md-6">
                                    <button onClick={this.onRemove} className="btn btn-lg btn-danger btn-block btn-submit" type="submit" >Remove</button>
                                </div>
                                <div className="col-md-6">
                                    <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-submit" type="submit" >{addUpdateButtonName}</button>
                                </div>
                            </div>
                        }
                        <FormStyle />
                </div>
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * For crypto custom value change 
     * -------------------------------------------------------------------------------- */
    onCryptoValueChange(fieldName, value){
        const { cryptoCustom } = this.state;
        cryptoCustom[fieldName] = value;
        this.setState({cryptoCustom});
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
        const { portfolio, portfolioActions, onSubmit } = this.props;
        const { isCustom } = this.state;
        let params = {};

        if(isCustom){
            params = this.onSubmitCustomCoin();
        }else{
            params = this.onSubmitCMCCoin();
        }
        
        // make sure crypto is required
        if( params.id==="" || params.value==="" || params.symbol==="" ){
            return toasterErrorMessage('Please fill up the required(*) fields!')
        }

        
        // submit form
        if(portfolio._id){
            portfolioActions.itemUpdate({
                _id: portfolio._id,
                params,
            });
        }else{
            portfolioActions.itemCreate({
                params,
            });
        }
            
        onSubmit(params);
    }
    
    /* ----------------------------------------------------------------------------------
     * On Submit from selected Coinmarketcap coin 
     * -------------------------------------------------------------------------------- */
    onSubmitCMCCoin(){
        const { user } = this.props;

        // get all data to be submitted to the server
        const params = {
            user_id       : user._id,
            amount        : this.state.amount,
            buy_price_usd : this.state.buy_price_usd,
            buy_price_btc : this.state.buy_price_btc,
            buy_price_eth : this.state.buy_price_eth,
            notes         : this.state.notes,
            id            : this.state.crypto.id,
            value         : this.state.crypto.value,
            label         : this.state.crypto.label,
            symbol        : this.state.crypto.symbol,
            isCustom      : false,
        };
    
        return params;
    }

    /* ----------------------------------------------------------------------------------
     * On Submit from a custom coin 
     * -------------------------------------------------------------------------------- */
    onSubmitCustomCoin(){
        const { user } = this.props;
        const { cryptoCustom } = this.state;

        // get all data to be submitted to the server
        const params = {
            user_id       : user._id,
            amount        : this.state.amount,
            buy_price_usd : this.state.buy_price_usd,
            buy_price_btc : this.state.buy_price_btc,
            buy_price_eth : this.state.buy_price_eth,
            notes         : this.state.notes,
            id            : cryptoCustom.id,
            name          : cryptoCustom.id,
            value         : cryptoCustom.id,
            symbol        : cryptoCustom.symbol,
            label         : `${cryptoCustom.id} (${cryptoCustom.symbol})`,
            isCustom      : true,
        };

        return params;
    }

    /* ----------------------------------------------------------------------------------
     * When trying to update portfolio user can remove that item by pressing the delete button
     * -------------------------------------------------------------------------------- */
    onRemove(evt){
        evt.preventDefault();
        const { onRemove } = this.props;

        confirmAlert({
            title: 'Are you sure?',
            message: 'You are about to delete this Coin. Action cannot be undone.',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => {
                        const { portfolio, portfolioActions } = this.props;
                        portfolioActions.itemRemove({_id: portfolio._id});
                        Cookies.set('portfolio', {}, { expires: 1 });
                        onRemove();
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

Form.propTypes = {
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
    onRemove : PropTypes.func,
    onSubmit : PropTypes.func,
    itemActions : PropTypes.object,
}

export default Form;
