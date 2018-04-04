import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../containers/Navbar';
import TableView from './portfolio/TableView';
import Header from './portfolio/Header';
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
                    portfolioActions.findByUserId({
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
                {portfoliosList && portfoliosList.allIds && portfoliosList.allIds.map(portfolio_id=>(
                    <div key={portfolio_id}>
                        <Card portfolio={portfoliosList.byId[portfolio_id]}
                              cryptoData={cryptoListPortfolio && cryptoListPortfolio.byId && cryptoListPortfolio.byId[portfolio_id]}
                              onClick={this.routeToPortfolioAdd} />
                    </div>
                ))}
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
        const { user, cryptoListPortfolio, cryptoGlobal } = this.props;
        const { isTableView } = this.state;
        console.log('c', cryptoListPortfolio);
        
        return(
            <div className="page-container">
                <Navbar />
                <Header user={user} cryptoGlobal={cryptoGlobal} cryptoList={cryptoListPortfolio} isTableView={isTableView} onClick={()=>this.setState({isTableView: !isTableView})} />
                <div className="card-container container">
                    {
                        isTableView ?
                            <TableView cryptoList={cryptoListPortfolio} onClick={this.routeToPortfolioAdd} />
                        :
                            <div className="">
                                {this.renderCardList()}
                            </div>
                    }
                    <div className="btn-wrapper bounceInUp animated">
                        <button onClick={()=>this.routeToPortfolioAdd({})} className="btn btn-lg btn-primary btn-block" type="submit">
                            Add Coin
                        </button>
                    </div>
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
}

export default Portfolio;
