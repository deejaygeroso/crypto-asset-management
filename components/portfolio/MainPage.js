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
            isWidgetVisible    : true,
            isStatsTableVisible : false,
            isPortfolioTableVisible : false,
        }
        this.routeToPortfolioAdd = this.routeToPortfolioAdd.bind(this);
        this.toggleView = this.toggleView.bind(this);
    }

    componentWillUnmount(){
        // const { portfolioActions } = this.props;
    }

    render(){
        const { user, portfolioList, cryptoHistory, priceAth, priceAtl, volumeAth, volumeAtl, cryptoGlobal } = this.props;
        const { isWidgetVisible, isStatsTableVisible, isPortfolioTableVisible } = this.state;
        return(
            <div className="page-container">
                <Navbar />
                <Header user={user} 
                        cryptoGlobal={cryptoGlobal} 
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
                        <div className="container-fluid d-flex align-items-center justify-content-center">
                            <PortfolioTable portfolioList={portfolioList} onClick={this.routeToPortfolioAdd} />
                        </div>  : <div></div>
                }

                {/* ----------------------------- */}
                {/* -------- Stats Table -------- */}
                {/* ----------------------------- */}
                {
                    isStatsTableVisible ?
                        <div className="container">
                            <StatsTable portfolioList={portfolioList} onClick={this.routeToPortfolioAdd} />
                        </div> : <div></div>
                }

                {/* ----------------------------- */}
                {/* ----------- Widget ---------- */}
                {/* ----------------------------- */}
                {
                    isWidgetVisible ?
                        <div className="d-flex align-content-around flex-wrap justify-content-center bounceInUp animated">
                            {
                                portfolioList && portfolioList.allIds && portfolioList.allIds.map(_id=>(
                                    <Card portfolio={portfolioList.byId[_id]} cryptoHistory={cryptoHistory} priceAth={priceAth} priceAtl={priceAtl} volumeAth={volumeAth} volumeAtl={volumeAtl} onClick={this.routeToPortfolioAdd} key={_id}/>
                                )) 
                            }
                        </div> : <div></div>
                }

                {/* ----------------------------- */}
                {/* --------- Add Button -------- */}
                {/* ----------------------------- */}
                <div className="btn-wrapper bounceInUp animated">
                    <button onClick={()=>this.routeToPortfolioAdd({})} className="btn btn-lg btn-primary btn-block" type="submit">
                        Add Coin
                    </button>
                </div>
            <style jsx global>{`
                    .card-container{
                        margin-top: 10px;
                    }
                    .btn-wrapper{
                        margin: 10px;
                        margin-top: 15px;
                    }
      
                `}</style>
        </div>
        )
    }

    toggleView(buttonName){
        this.setState({
            isWidgetVisible         : buttonName==="1" ? true : false,
            isStatsTableVisible     : buttonName==="2" ? true : false,
            isPortfolioTableVisible : buttonName==="3" ? true : false,
        })
    }

    routeToPortfolioAdd(payload){
        const { portfolioActions, portfolioAddRouteName } = this.props;
        portfolioActions.itemSet({payload})
        Router.push(portfolioAddRouteName);
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
    cryptoGlobal        : PropTypes.object,
    cryptoHistory       : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
    //actions
    portfolioActions    : PropTypes.object,
}

export default MainPage;

