import React, { Component } from 'react';
import PropTypes from 'prop-types';

import View from '../../portfolio/containers/View';

import Cookies from 'js-cookie';

class PortfolioView extends Component{

    constructor(props){
        super(props);
    }

    /* ----------------------------------------------------------------------------------
     * Fetch user Info onload
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { userActions, cryptoIdsActions, coinmarketcapTicker } = this.props;

        cryptoIdsActions.itemSet({payload: coinmarketcapTicker});

        // get users id on cookie then fetch portfolio of user from database
        const userCookie = Cookies.get('user');
        if(userCookie){
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            if(user && user._id){
                if(user._id){
                    userActions.itemFind({
                        params: {
                            _id : user._id
                        },
                    });
                }
            }
        }

    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        return(
            <div>
                <View portfolioMainPageRouteName="/portfolio/list" />
            </div>
        )
    }

}

PortfolioView.propTypes = {
    user             : PropTypes.object,
    userActions      : PropTypes.object,
    portfolio        : PropTypes.object,
    portfolioError   : PropTypes.object,
    portfolioSuccess : PropTypes.object,
    portfolioActions : PropTypes.object,
    cryptoIds        : PropTypes.array,
    cryptoIdsActions : PropTypes.object,
    coinmarketcapTicker : PropTypes.array.isRequired,
}

export default PortfolioView;
