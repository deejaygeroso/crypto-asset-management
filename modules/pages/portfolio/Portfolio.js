import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainPage from '../../portfolio/containers/MainPage';

import Cookies from 'js-cookie';

class Portfolio extends Component{

    constructor(props){
        super(props);
    }

    /* ----------------------------------------------------------------------------------
     * Fetch user info and his/her portfolio
     * -------------------------------------------------------------------------------- */
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

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        return(
            <div>
                <MainPage portfolioAddRouteName="/portfolio/view" coinmarketcapGlobal={this.props.coinmarketcapGlobal}/>
            </div>
        )
    }
}

Portfolio.propTypes = {
    coinmarketcapTicker : PropTypes.array,
    coinmarketcapGlobal : PropTypes.object,
    portfolioActions    : PropTypes.object,
    userActions    : PropTypes.object,
}

export default Portfolio;
