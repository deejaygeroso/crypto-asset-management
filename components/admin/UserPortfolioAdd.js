import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Router from 'next/router';

import FormPage from '../../containers/portfolio/FormPage';


class UserPortfolioAdd extends Component{

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        const { user, cryptoIdsActions, coinmarketcapTicker } = this.props;

        cryptoIdsActions.itemSet({payload: coinmarketcapTicker});

        if(!user._id && user.email===''){
            // Router.push('/admin/manage')
        }

    }

    render(){
        return(
            <FormPage portfolioMainPageRouteName="/admin/userportfolio" onSubmit={this.onSubmit}/>
        )
    }

    onSubmit(){
        
        const { user, portfolioActions, coinmarketcapTicker } = this.props;
        // get users id on cookie then fetch portfolio of user from database
        portfolioActions.itemListFindByUserId({
            params: {
                user_id: user._id,
            },
            coinmarketcapTicker,
        });


    }
}

UserPortfolioAdd.propTypes = {
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

export default UserPortfolioAdd;
