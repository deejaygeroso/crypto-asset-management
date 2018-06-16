import React, { Component } from 'react';
import PropTypes from 'prop-types';

import View from '../../portfolio/containers/View';

class PortfolioView extends Component{

    constructor(props){
        super(props);
    }

    /* ----------------------------------------------------------------------------------
     * Fetch user Info onload
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { cryptoIdsActions, coinmarketcapTicker } = this.props;

        cryptoIdsActions.itemSet({payload: coinmarketcapTicker});
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { coinmarketcapTicker } = this.props;
        return(
            <div>
                <View portfolioMainPageRouteName="/portfolio/list" coinmarketcapTicker={coinmarketcapTicker}/>
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
