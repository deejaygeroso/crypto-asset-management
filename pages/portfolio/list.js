import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';

import Layout from '../../components/Layout';
import Portfolio from '../../containers/Portfolio'

import axios from 'axios';

class PortfolioPage extends Component{

    static async getInitialProps({ store, req }) {

        const isServer = !!req;

        const apiCMCTickerRes = await axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0&&convert=ETH');
        const apiCMCGlobalRes = await axios.get('https://api.coinmarketcap.com/v1/global/');

        return { initialState: store.getState(), isServer, coinmarketcapTicker: apiCMCTickerRes.data, coinmarketcapGlobal: apiCMCGlobalRes.data };
    }

    constructor(props) {
        super(props);
        
        this.store = initStore(props.initialState, props.isServer);
    }

    render(){
        const { coinmarketcapTicker, coinmarketcapGlobal } = this.props;
        return(
            <Provider store={this.store}>
                <Layout>
                    <Portfolio coinmarketcapTicker={coinmarketcapTicker} coinmarketcapGlobal={coinmarketcapGlobal}/>
                </Layout>
            </Provider>
        )
    }
}

PortfolioPage.propTypes = {
    coinmarketcapTicker : PropTypes.array,
    coinmarketcapGlobal : PropTypes.object,
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(PortfolioPage);
