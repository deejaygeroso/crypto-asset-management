import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../core/containers/Navbar';
import FormStyle from '../../styles/FormStyle';
import Form from '../containers/Form';

class View extends Component {

    constructor(props){
        super(props);
        this.state = {
            isFormVisible: false,
        }
    }

    renderForm() {
        return <Form portfolioMainPageRouteName={this.props.portfolioMainPageRouteName} />
    }

    renderDataView(){
        const { portfolio } = this.props;
        return(
            <div className="container flex-column align-items-center justify-content-center mt-20">
                {/* ------------------------------*/}
                {/* ------ Form View Title ------ */}
                {/* ------------------------------*/}
                <div className="d-flex align-items-center justify-content-center mt-30">
                    <div className="d-flex align-items-center justify-content-center icon-wrapper form-view-title">
                        <img src={`/static/icon/${portfolio && portfolio.symbol && portfolio.symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="80" width="80" />
                        <h1 className=" pl-10">{portfolio && portfolio.name}</h1>
                    </div>
                    <div>
                    </div>
                </div>

                {/* ------------------------------*/}
                {/* ----------- Amount ---------- */}
                {/* ------------------------------*/}
                <div className="d-flex flex-column align-items-center justify-content-center mt-20">
                    <span className="form-view-text form-view-amount">$ {portfolio && portfolio.amount ? portfolio.amount.toFixed(2) : "0.00"}</span>
                    <span className="form-view-text form-view-amount-title">Amount</span>
                </div>
                {/* ------------------------------*/}
                {/* ---------- Buy Price -------- */}
                {/* ------------------------------*/}
                <div className="d-flex flex-row align-items-center justify-content-center mt-100">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <span className="form-view-text">Buy Price (USD)</span>
                        <span className="form-view-value">{portfolio && portfolio.buy_price_usd}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center ml-40 mr-40">
                        <span className="form-view-text">Buy Price (BTC)</span>
                        <span className="form-view-value">{portfolio && portfolio.buy_price_btc}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <span className="form-view-text">Buy Price (ETH)</span>
                        <span className="form-view-value">{portfolio && portfolio.buy_price_eth}</span>
                    </div>
                </div>
                {/* ------------------------------*/}
                {/* ------------ Notes ---------- */}
                {/* ------------------------------*/}
                <div className="d-flex flex-column align-items-center justify-content-center mt-50">
                    <span className="form-view-text">Notes</span>
                    <span className="form-view-text">{portfolio && portfolio.notes}</span>
                </div>
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { isFormVisible } = this.state;
        return(
            <div className="page-container">
                <Navbar />


                <div className="gradient-header">
                    {this.state.isFormVisible ? this.renderForm() : this.renderDataView()}

                </div>
                <button onClick={()=>this.setState({isFormVisible: !isFormVisible})} className="btn btn-lg btn-warning flip animated edit-button" type="submit" >
                    <span>
                        <i className="fas fa-lg fa-pencil-alt " color></i>
                    </span>
                </button>
                <FormStyle />
            </div>
        )
    }
}

View.propTypes = {
    portfolio : PropTypes.object,
    portfolioMainPageRouteName : PropTypes.string,
};

export default View;