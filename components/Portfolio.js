import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../containers/Navbar';
import StatsTable from './portfolio/StatsTable';
import PortfolioTable from './portfolio/PortfolioTable';
import Header from './portfolio/Header';
import Card from './portfolio/Card';
import Cookies from 'js-cookie';

class Portfolio extends Component{

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

    componentDidMount(){
        const { portfolioActions, coinmarketcapTicker } = this.props;

        // get users id on cookie then fetch portfolio of user from database
        const userCookie = Cookies.get('user');
        if(userCookie){
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            if(user && user._id){
                if(user._id){
                    portfolioActions.itemListFindByUserId({
                        params: {
                            user_id : user._id
                        },
                        coinmarketcapTicker,
                    });
                }
            }
        }
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
                        
                {/* ----------------------------- */}
                {/* ------ Portfolio Table ------ */}
                {/* ----------------------------- */}
                {
                    isPortfolioTableVisible ?
                        <div className="container-fluid d-flex align-items-center justify-content-center" style={{paddingLeft: 25, paddingRight: 25}}>
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
                                    <Card portfolio={portfolioList.byId[_id]} cryptoHistory={cryptoHistory} priceAth={priceAth} priceAtl={priceAtl} volumeAth={volumeAth} volumeAtl={volumeAtl} key={_id}/>
                                )) 
                            }
                        </div> : <div></div>
                }
                    {/*
                    <div className="btn-wrapper bounceInUp animated">
                        <button onClick={()=>this.routeToPortfolioAdd({})} className="btn btn-lg btn-primary btn-block" type="submit">
                            Add Coin
                        </button>
                    </div>
                    */}
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
        const { portfolioActions } = this.props;
        portfolioActions.itemSet({payload})
        Router.push('/portfolio/add');
    }

}

Portfolio.propTypes = {
    //data
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

export default Portfolio;
