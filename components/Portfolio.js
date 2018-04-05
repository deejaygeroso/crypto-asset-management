import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../containers/Navbar';
import TableView from './portfolio/TableView';
import Header from './portfolio/Header';
import CardPortfolio from './portfolio/Card';
import Card from './portfolio/Card';
import Cookies from 'js-cookie';

class Portfolio extends Component{

    constructor(props){
        super(props);
        this.state = {
            isTableView: false,
        }
        this.routeToPortfolioAdd = this.routeToPortfolioAdd.bind(this);
    }

    componentDidMount(){
        const { userActions, portfolioActions, coinmarketcapTicker } = this.props;

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

    renderCardList(){
        const { portfoliosList, cryptoListPortfolio } = this.props;
        
        return(
            <div className="bounceInUp animated">
                {/*portfoliosList && portfoliosList.allIds && portfoliosList.allIds.map(portfolio_id=>(
                    <div key={portfolio_id}>
                        <CardPortfolio portfolio={portfoliosList.byId[portfolio_id]}
                              cryptoData={cryptoListPortfolio && cryptoListPortfolio.byId && cryptoListPortfolio.byId[portfolio_id]}
                              onClick={this.routeToPortfolioAdd} />
                    </div>
                ))*/}
                {/*
                <div className="btn-wrapper">
                    <button onClick={()=>this.routeToPortfolioAdd({})} className="btn btn-lg btn-primary btn-block" type="submit">
                        Add Coin
                    </button>
                </div>
                */}
            </div>
        )
    }

    render(){
        const { user, cryptoListPortfolio, cryptoHistory, cryptoAth, cryptoAtl, cryptoGlobal, portfolioList } = this.props;
        const { isTableView } = this.state;
        
        return(
            <div className="page-container">
                <Navbar />
                <Header user={user} cryptoGlobal={cryptoGlobal} cryptoList={cryptoListPortfolio} isTableView={isTableView} onClick={()=>this.setState({isTableView: !isTableView})} />

                <div className="">
                <div className="d-flex align-content-around flex-wrap justify-content-center">
                    <div className="d-flex crypto-container flex-wrap justify-content-center bounceInUp animated">
                        {
                            portfolioList && portfolioList.allIds && portfolioList.allIds.map((_id, key)=>(
                                <div key={key}>
                                    {_id ? <Card portfolio={portfolioList.byId[_id]} cryptoHistory={cryptoHistory} cryptoAth={cryptoAth} cryptoAtl={cryptoAtl} /> : <div/> }
                                </div>
                            ))
                        }
                    </div>

                    {/*
                        isTableView ?
                            <TableView cryptoList={cryptoListPortfolio} onClick={this.routeToPortfolioAdd} />
                        :
                            <div className="">
                                {this.renderCardList()}
                            </div>
                    <div className="btn-wrapper bounceInUp animated">
                        <button onClick={()=>this.routeToPortfolioAdd({})} className="btn btn-lg btn-primary btn-block" type="submit">
                            Add Coin
                        </button>
                    </div>
                    */}
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
            </div>
        )
    }

    routeToPortfolioAdd(payload){
        const { portfolioActions } = this.props;
        portfolioActions.portfolioSet({payload})
        Router.push('/portfolio/add');
    }

}

Portfolio.propTypes = {
    user                : PropTypes.object,
    userActions         : PropTypes.object,
    cryptoIdsActions    : PropTypes.object,
    cryptoListPortfolio : PropTypes.object,
    portfoliosList      : PropTypes.object,
    portfolioActions    : PropTypes.object,
    cryptoGlobal        : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
}

export default Portfolio;
