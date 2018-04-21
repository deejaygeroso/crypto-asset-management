import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../core/containers/Navbar';
import Form from '../containers/Form';

import ViewStyle from '../styles/ViewStyles';

import Cookies from 'js-cookie';

class View extends Component {

    constructor(props){
        super(props);
        this.state = {
            isFormVisible: false,
            isFormCreate: false,
        }
    }

    componentDidMount(){
        const { portfolioActions } = this.props;
        const portfolioCookie = Cookies.get('portfolio');
        const portfolio = JSON.parse(portfolioCookie);

        // set portfolio
        portfolioActions.itemSet({
            payload: portfolio,
        })

        // show portfolio form instead of the view info if user is in create portfolio mode
        if(!(portfolio && portfolio._id)){
            this.setState({isFormVisible: true, isFormCreate: true});
        }

    }

    /* ----------------------------------------------------------------------------------
     * Render create/update portfolio form
     * -------------------------------------------------------------------------------- */
    renderForm() {
        return <Form portfolioMainPageRouteName={this.props.portfolioMainPageRouteName} onSubmit={()=>this.setState({isFormVisible: false})}/>
    }

    /* ----------------------------------------------------------------------------------
     * Render data information of user's portfolio
     * -------------------------------------------------------------------------------- */
    renderDataView(){
        const { portfolio } = this.props;
        return(
            <div className="container flex-column align-items-center justify-content-center mt-20">

                {/* ------------------------------*/}
                {/* ------ Form View Title ------ */}
                {/* ------------------------------*/}
                {
                    portfolio && portfolio.symbol ?
                        <div className="d-flex align-items-center justify-content-center mt-30">
                            <div className="d-flex align-items-center justify-content-center icon-wrapper form-view-title">
                                <img src={`/static/icon/${portfolio && portfolio.symbol && portfolio.symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="80" width="80" />
                                <h1 className=" pl-10">{portfolio && portfolio.id ? portfolio.id.charAt(0).toUpperCase() + portfolio.id.slice(1) : ""}</h1>
                            </div>
                        </div>
                    : <div />
                }

                {/* ------------------------------*/}
                {/* ----------- Amount ---------- */}
                {/* ------------------------------*/}
                <div className="d-flex flex-column align-items-center justify-content-center mt-20">
                    <span className="form-view-text form-view-amount">$ {portfolio && portfolio.amount ? parseFloat(portfolio.amount).toFixed(2) : "0.00"}</span>
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
                { portfolio && portfolio.notes ?
                    <div className="d-flex flex-column align-items-center justify-content-center mt-50">
                        <span className="form-view-text">Notes</span>
                        <span className="form-view-text">{portfolio && portfolio.notes}</span>
                    </div> : <div/>
                }

                {/* ------------------------------*/}
                {/* ------------ Links ---------- */}
                {/* ------------------------------*/}
                <div className="d-flex flex-column align-items-center justify-content-center form-view-links">
                    { portfolio && portfolio.links && portfolio.links!==0 && portfolio.links.map((link,key)=>(
                        <a target="_blank" href={this.getUrlLink(link && link.address)} key={key}>{link.name}</a>
                    )) }
                </div>

            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Add http:// protocol for links that does not have it.
     * -------------------------------------------------------------------------------- */
    getUrlLink(address){
        if( (address.substring(0, 7)==='http://') || (address.substring(0, 8)==='https://') ){
            return address;
        }
        return `http://${address}`;
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { portfolio } = this.props;
        const { isFormVisible } = this.state;
        return(
            <div className="page-container">
                <Navbar />

                {/* ------------------------------*/}
                {/* ------------ Form ----------- */}
                {/* ------------------------------*/}
                <div className="gradient-header">
                    {this.state.isFormVisible ? this.renderForm() : this.renderDataView()}
                </div>

                {/* ------------------------------*/}
                {/* ------ Edit Form Button ----- */}
                {/* ------------------------------*/}
                {
                    portfolio && portfolio._id ?
                        <span onClick={()=>this.setState({isFormVisible: !isFormVisible})} className="flip animated edit-button">
                            { isFormVisible ? <i className="fas fa-lg fa-times fa-view-icon"></i> : <i className="fas fa-lg fa-pencil-alt fa-view-icon"></i> }
                        </span>
                    : <div/>
                }

                {/* ------------------------------*/}
                {/* --------- Back Button ------- */}
                {/* ------------------------------*/}
                <span onClick={()=>window.history.back()} className="flip animated back-button">
                    <i className="fas fa-lg fa-chevron-left fa-view-icon"></i>
                </span>

                <ViewStyle />
            </div>
        )
    }
}

View.propTypes = {
    portfolio : PropTypes.object,
    portfolioActions: PropTypes.object,
    portfolioMainPageRouteName : PropTypes.string,
};

export default View;