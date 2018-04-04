import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import TableView from '../portfolio/TableView';
import Card from '../portfolio/Card';
import Header from '../portfolio/Header';
import Navbar from '../../containers/Navbar';

class Portfolio extends Component{

    constructor(props){
        super(props);
        this.state = {
            isTableView: false,
        }
        this.routeToUserPortfolioAdd = this.routeToUserPortfolioAdd.bind(this);
    }

    componentDidMount(){
        const { user } = this.props;
        if(!user._id && user.email===''){
            Router.push('/admin/manage')
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
                              onClick={this.routeToUserPortfolioAdd} />
                    </div>
                ))}
            </div>
        )
    }

    render(){
        const { user, cryptoListPortfolio, cryptoGlobal } = this.props;
        const { isTableView } = this.state;
        return(
            <div className="page-container">
                <Navbar />
                <Header user={user} cryptoGlobal={cryptoGlobal} cryptoList={cryptoListPortfolio}  isTableView={isTableView} onClick={()=>this.setState({isTableView: !isTableView})} />
                <div className="card-container container">
                    {
                        isTableView ?
                            <TableView cryptoList={cryptoListPortfolio} onClick={this.routeToUserPortfolioAdd} />
                        :
                            <div className="bounceInUp animated">
                                {this.renderCardList()}
                            </div>
                    }
                    <div className="btn-wrapper">
                        <button onClick={()=>this.routeToUserPortfolioAdd({})} className="btn btn-lg btn-primary btn-block btn-signin" type="submit" >
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

    routeToUserPortfolioAdd(payload){
        const { portfolioActions } = this.props;
        portfolioActions.portfolioSet({payload})
        Router.push('/admin/userportfolioadd');
    }
}

Portfolio.propTypes = {
    user                : PropTypes.object,
    userActions         : PropTypes.object,
    cryptoIdsActions    : PropTypes.object,
    portfoliosList      : PropTypes.object,
    portfolioActions    : PropTypes.object,
    cryptoGlobal        : PropTypes.object,
    cryptoListPortfolio : PropTypes.object,

}

export default Portfolio;
