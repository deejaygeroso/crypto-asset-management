import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../../containers/Navbar';
import StatsTable from './StatsTable';
import PortfolioTable from './PortfolioTable';
import Header from './Header';
import Card from './Card';

class MainPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            isPortfolioTableVisible : true,
            isStatsTableVisible : false,
            isWidgetVisible    : false,
        }
        this.routeToPortfolioAdd = this.routeToPortfolioAdd.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.sortTableBy = this.sortTableBy.bind(this);
    }

    componentWillUnmount(){
        const { portfolioActions } = this.props;
        portfolioActions.itemListClear();
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { user, portfolioList, cryptoHistory, priceAth, priceAtl, volumeAth, volumeAtl, coinmarketcapGlobal, sortTableBy } = this.props;
        const { isWidgetVisible, isStatsTableVisible, isPortfolioTableVisible } = this.state;
        
        return(
            <div className="page-container">
                <Navbar />
                <Header user={user} 
                        cryptoGlobal={coinmarketcapGlobal} 
                        cryptoList={portfolioList} 
                        isWidgetVisible={isWidgetVisible} 
                        isStatsTableVisible={isStatsTableVisible} 
                        isPortfolioTableVisible={isPortfolioTableVisible} 
                        onClick={(buttonName)=>this.toggleView(buttonName)} />

                <div style={{margin: 20}}/>

                
                {/* ----------------------------- */}
                {/* ------ Portfolio Table ------ */}
                {/* ----------------------------- */}
                {
                    isPortfolioTableVisible ?
                        <div className="container-fluid" style={{paddingLeft: 50, paddingRight: 50}}>
                            <h1 className="fadeIn animated" style={{textAlign: 'center', marginBottom: 2, fontWeight: '100', color: '#242424'}}>Profit Margin</h1>
                            <PortfolioTable portfolioList={portfolioList} onClick={this.routeToPortfolioAdd} sortTableBy={this.sortTableBy} />
                        </div> : <div></div>
                }

                {/* ----------------------------- */}
                {/* -------- Stats Table -------- */}
                {/* ----------------------------- */}
                {
                    isStatsTableVisible ?
                        <div>
                            <h1 className="fadeIn animated" style={{textAlign: 'center', marginBottom: 2, fontWeight: '100', color: '#242424'}}>Other Stats</h1>
                            <div className="container-fluid d-flex align-items-center justify-content-center">
                                <StatsTable portfolioList={portfolioList} onClick={this.routeToPortfolioAdd} />
                            </div>
                        </div> : <div></div>
                }

                {/* ----------------------------- */}
                {/* ----------- Widget ---------- */}
                {/* ----------------------------- */}
                {
                    isWidgetVisible ?
                        <div>
                            <h1 className="fadeIn animated" style={{textAlign: 'center', marginBottom: 2, fontWeight: '100', color: '#242424'}}>Volume Overview</h1>
                            <div className="d-flex align-content-around flex-wrap justify-content-center bounceInRight animated">
                                {
                                    portfolioList && portfolioList.allIdsUniq && portfolioList.allIdsUniq.map(_id=>(
                                        <Card portfolio={portfolioList.byId[_id]} 
                                              cryptoHistory={cryptoHistory} 
                                              priceAth={priceAth} 
                                              priceAtl={priceAtl} 
                                              volumeAth={volumeAth} 
                                              volumeAtl={volumeAtl} 
                                              onClick={this.routeToPortfolioAdd} 
                                              key={_id}/>
                                    )) 
                                }
                            </div>
                        </div> : <div></div>
                }

                {/* ----------------------------- */}
                {/* --------- Add Button -------- */}
                {/* ----------------------------- */}
                <button onClick={()=>this.routeToPortfolioAdd({})} className="btn-portfolio-add btn btn-lg btn-warning btn-table flip animated" type="submit" >
                    <span>
                        <i className="fas fa-lg fa-plus"></i>
                    </span>
                </button>
                <div style={{padding: 80}} />
                <style jsx global>{`
                    .card-container{
                        margin-top: 10px;
                        margin-bottom: 50px;
                    }
                    .btn-wrapper{
                        margin: 10px;
                        margin-top: 15px;
                    }
                    .btn-portfolio-add{
                        position: fixed;
                        right: 50px;
                        width: 80px;
                        height: 80px;
                        bottom: 50px;
                        border-radius: 50px;
                        background-color: #64d1b6;
                        color: #fff;
                        box-shadow: 2px 2px 8px #888;
                    }
                `}</style>
        </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Toggle Main Page
     * -------------------------------------------------------------------------------- */
    toggleView(buttonName){
        this.setState({
            isPortfolioTableVisible : buttonName==="1" ? true : false,
            isWidgetVisible         : buttonName==="2" ? true : false,
            isStatsTableVisible     : buttonName==="3" ? true : false,
        })
    }

    /* ----------------------------------------------------------------------------------
     * Add new coin to portfolio
     * -------------------------------------------------------------------------------- */
    routeToPortfolioAdd(payload){
        const { portfolioActions, portfolioAddRouteName, routerPush } = this.props;
        portfolioActions.itemSet({payload})

        // used for admin to pass query object
        if(routerPush){
            return routerPush()
        }

        Router.push(portfolioAddRouteName);
    }

    sortTableBy(sortFieldName){
        this.props.portfolioActions.itemsListSortData({sortFieldName})
    }

}

MainPage.propTypes = {
    //data
    portfolioAddRouteName : PropTypes.string,
    user                : PropTypes.object,
    userActions         : PropTypes.object,
    portfolioList       : PropTypes.object,
    priceAth            : PropTypes.object,
    priceAtl            : PropTypes.object,
    volumeAth           : PropTypes.object,
    volumeAtl           : PropTypes.object,
    cryptoHistory       : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
    coinmarketcapGlobal : PropTypes.object,
    //actions
    portfolioActions    : PropTypes.object,
    routerPush          : PropTypes.func,
}

export default MainPage;

