import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import MainPage from '../../portfolio/containers/MainPage';

import Cookies from 'js-cookie';

class Portfolio extends Component{

    constructor(props){
        super(props);
        this.state = {
            isTableView: false,
        }
        this.routerPush = this.routerPush.bind(this);
    }

    /* ----------------------------------------------------------------------------------
     * fetch user portfolio based on user_id passed from the selected user from manage page
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { portfolioActions, coinmarketcapTicker } = this.props;

        const user_id = Cookies.get('user_id');

        if(!user_id || user_id===''){
            Router.push('/admin/manage');
        }
        // get users id on cookie then fetch portfolio of user from database
        portfolioActions.itemListFindByUserId({
            params: {
                user_id,
            },
            coinmarketcapTicker,
        });

    }

    /* ----------------------------------------------------------------------------------
     * Main Component 
     * -------------------------------------------------------------------------------- */
    render(){
        return(
            <div>
                <MainPage routerPush={this.routerPush} portfolioAddRouteName="/admin/userportfolioview" coinmarketcapGlobal={this.props.coinmarketcapGlobal}/>
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Attach selected user Id to the next routed page which is routerPush for edit
     * -------------------------------------------------------------------------------- */
    routerPush(){
        Router.push({
            pathname: '/admin/userportfolioview',
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
