import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import View from '../../portfolio/containers/View';

import Cookies from 'js-cookie';

class UserPortfolioView extends Component{

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /* ----------------------------------------------------------------------------------
     * If no user id is passed redirect back to manage page 
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { cryptoIdsActions, coinmarketcapTicker } = this.props;

        const user_id = Cookies.get('user_id') ;

        if(!user_id || user_id===''){
            Router.push('/admin/manage');
        }

        cryptoIdsActions.itemSet({payload: coinmarketcapTicker});

    }

    /* ----------------------------------------------------------------------------------
     * Main Page. 
     * -------------------------------------------------------------------------------- */
    render(){
        return(
            <View portfolioMainPageRouteName="/admin/userportfolio" onSubmit={this.onSubmit}/>
        )
    }

    /* ----------------------------------------------------------------------------------
     * On submit pass back the user id back to userportfolio page 
     * -------------------------------------------------------------------------------- */
    onSubmit(){
        
        const { user, portfolioActions, coinmarketcapTicker } = this.props;
        // get users id on cookie then fetch portfolio of user from database
        portfolioActions.itemListFindByUserId({
            params: {
                user_id: user._id,
            },
            coinmarketcapTicker,
        });

        const user_id = (Router && Router.query && Router.query.user_id) || '';
        Router.push({
            pathname: '/admin/userportfolio',
            query: {
                user_id,
            },
        })

    }
}

UserPortfolioView.propTypes = {
    user             : PropTypes.object,
    userActions      : PropTypes.object,
    portfolio        : PropTypes.object,
    portfolioError   : PropTypes.object,
    portfolioSuccess : PropTypes.object,
    portfolioActions : PropTypes.object,
    cryptoIds        : PropTypes.array,
    cryptoIdsActions : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
}

export default UserPortfolioView;
