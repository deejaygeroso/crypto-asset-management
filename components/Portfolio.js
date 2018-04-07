import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainPage from '../containers/portfolio/MainPage';

import Cookies from 'js-cookie';

class Portfolio extends Component{

    constructor(props){
        super(props);
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
        return(
            <div>
                <MainPage  portfolioAddRouteName="/portfolio/add" />
            </div>
        )
    }

}

Portfolio.propTypes = {
//     //data
//     user                : PropTypes.object,
//     userActions         : PropTypes.object,
//     portfolioList       : PropTypes.object,
//     priceAth            : PropTypes.object,
//     priceAtl            : PropTypes.object,
//     volumeAth           : PropTypes.object,
//     volumeAtl           : PropTypes.object,
//     cryptoGlobal        : PropTypes.object,
//     cryptoHistory       : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
//     //actions
    portfolioActions    : PropTypes.object,
}

export default Portfolio;
