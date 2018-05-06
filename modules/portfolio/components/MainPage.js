import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../../core/containers/Navbar';
import StatsTable from './StatsTable';
import ProfitMarginTable from './ProfitMarginTable';
import Header from './Header';
import Card from './Card';

import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';

class MainPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            isPortfolioTableVisible : true,
            isStatsTableVisible : false,
            isWidgetVisible    : false,

            sortFieldName: '',
            sortFieldStatus: '',

            statsSortFieldName: '',
            statsSortFieldStatus: '',

        }
        this.routeToPortfolioAdd = this.routeToPortfolioAdd.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.sortTableBy = this.sortTableBy.bind(this);
        this.statsSortTableBy = this.statsSortTableBy.bind(this);
    }

    componentDidMount() {
        
    }
    

    componentWillUnmount(){
        const { portfolioActions } = this.props;
        portfolioActions.itemListClear();
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { user, portfolioList, cryptoHistory, priceAth, priceAtl, volumeAth, volumeAtl, coinmarketcapGlobal } = this.props;
        const { isWidgetVisible, isStatsTableVisible, isPortfolioTableVisible } = this.state;
        return(
            <div className="page-container">
                <ToastContainer />
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
                {/* ------- Profit Margin ------- */}
                {/* ----------------------------- */}
                {
                    isPortfolioTableVisible ?
                        <div className="container-fluid" style={{paddingLeft: 50, paddingRight: 50}}>
                            <h1 className="fadeIn animated" style={{textAlign: 'center', marginBottom: 2, fontWeight: '100', color: '#242424'}}>Profit Margin</h1>
                            <ProfitMarginTable portfolioList={portfolioList} onClick={this.routeToPortfolioAdd} sortTableBy={this.sortTableBy} sortFieldName={this.state.sortFieldName} sortFieldStatus={this.state.sortFieldStatus}/>
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
                                <StatsTable portfolioList={portfolioList} onClick={this.routeToPortfolioAdd} sortTableBy={this.statsSortTableBy} sortFieldName={this.state.statsSortFieldName} sortFieldStatus={this.state.statsSortFieldStatus}/>
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
                                    portfolioList && portfolioList.allIds_otherStats && portfolioList.allIds_otherStats.map(_id=>(
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
                    <i className="fas fa-lg fa-plus"></i>
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
                    .btn-portfolio-add > i{
                        margin-top: 5px;
                        margin-left: 2px;
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
        Cookies.set('portfolio', payload, { expires: 1 });

        // used for admin to pass query object
        if(routerPush){
            return routerPush();
        }

        Router.push(portfolioAddRouteName);
    }

    /* ----------------------------------------------------------------------------------
     * Sort Profit Margin Table 
     * -------------------------------------------------------------------------------- */
    sortTableBy(sortFieldNameInput){
        const { sortFieldName, sortFieldStatus } = this.state;
        let status = '';
        if(sortFieldName===sortFieldNameInput){
            // if(sortFieldStatus===''){
            //     // if pressed the 4th time back to the cycle
            //     status='up';
            // }
            if(sortFieldStatus==='up'){
                // second press is descending
                status='down';
            }
            if(sortFieldStatus==='down'){
                // third press is back to neutral
                status='up';
            }
        }else{
            // first press is ascending
            status='up'
        }

        // set the status for changing of sort icons per column
        this.setState({
            sortFieldName: sortFieldNameInput,
            sortFieldStatus: status,
        })

        // sort table of profit margin
        this.props.portfolioActions.itemsListSortData({
            sortFieldName: sortFieldNameInput,
            sortFieldStatus: status,
        })
    }

    /* ----------------------------------------------------------------------------------
     * Sort Other Stats
     * -------------------------------------------------------------------------------- */
    statsSortTableBy(statsSortFieldNameInput){
        const { statsSortFieldName, statsSortFieldStatus } = this.state;
        let status = '';
        if(statsSortFieldName===statsSortFieldNameInput){
            // if(statsSortFieldStatus===''){
            //     // if pressed the 4th time back to the cycle
            //     status='up';
            // }
            if(statsSortFieldStatus==='up'){
                // second press is descending
                status='down';
            }
            if(statsSortFieldStatus==='down'){
                // third press is back to neutral
                status='up';
            }
        }else{
            // first press is ascending
            status='up'
        }

        // set the status for changing of sort icons per column
        this.setState({
            statsSortFieldName: statsSortFieldNameInput,
            statsSortFieldStatus: status,
        })

        // sort table of other stats
        this.props.portfolioActions.itemsListOtherStatsSortData({
            sortFieldName: statsSortFieldNameInput,
            sortFieldStatus: status,
        })
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

