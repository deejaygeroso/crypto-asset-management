import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Router from 'next/router';

import MainPage from '../../containers/portfolio/MainPage';

class Portfolio extends Component{

    constructor(props){
        super(props);
        this.state = {
            isTableView: false,
        }
    }

    componentDidMount(){
        const { user } = this.props;
        if(!user._id && user.email===''){
            // Router.push('/admin/manage')
        }

    }

    render(){
        return(
            <div>
                <MainPage  portfolioAddRouteName="/admin/userportfolioadd" />
            </div>
        )
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
    coinmarketcapTicker : PropTypes.array,

}

export default Portfolio;
