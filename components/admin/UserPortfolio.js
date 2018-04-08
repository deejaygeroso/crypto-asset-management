import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import MainPage from '../../containers/portfolio/MainPage';

class Portfolio extends Component{

    constructor(props){
        super(props);
        this.state = {
            isTableView: false,
        }
        this.routerPush = this.routerPush.bind(this);
    }

    componentDidMount(){
        const { portfolioActions, coinmarketcapTicker } = this.props;

        const user_id = (Router && Router.query && Router.query.user_id) || '';

        if(!user_id || user_id===''){
            Router.push('/admin/manage');
        }
        // get users id on cookie then fetch portfolio of user from database
        portfolioActions.itemListFindByUserId({
            params: {
                user_id
            },
            coinmarketcapTicker,
        });

    }

    render(){
        return(
            <div>
                <MainPage routerPush={this.routerPush} portfolioAddRouteName="/admin/userportfolioadd" coinmarketcapGlobal={this.props.coinmarketcapGlobal}/>
            </div>
        )
    }

    routerPush(){
        const user_id = (Router && Router.query && Router.query.user_id) || '';
        Router.push({
            pathname: '/admin/userportfolioadd',
            query: {
                user_id,
            },
        })
    }
}

Portfolio.propTypes = {
    userActions         : PropTypes.object,
    cryptoIdsActions    : PropTypes.object,
    portfoliosList      : PropTypes.object,
    portfolioActions    : PropTypes.object,
    cryptoGlobal        : PropTypes.object,
    cryptoListPortfolio : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
    coinmarketcapGlobal : PropTypes.object,

}

export default Portfolio;
