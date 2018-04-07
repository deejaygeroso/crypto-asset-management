import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';

import Layout from '../../components/Layout';
import PortfolioAdd from '../../containers/PortfolioAdd'

import axios from 'axios';

class PortfolioAddPage extends React.Component{

    static async getInitialProps({ store, req }) {

        const isServer = !!req;

        const apiRes = await axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0');

        return { initialState: store.getState(), isServer, coinmarketcapTicker: apiRes.data };
    }

    constructor(props) {
        super(props);
        this.store = initStore(props.initialState, props.isServer);
    }

    render(){
        // console.log('props', this.props);
        return(
            <Provider store={this.store}>
                <Layout>
                    <PortfolioAdd coinmarketcapTicker={this.props.coinmarketcapTicker}/>
                </Layout>
            </Provider>
        )
    }
}

PortfolioAddPage.propTypes = {
    initialState : PropTypes.object,
    coinmarketcapTicker : PropTypes.array,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(PortfolioAddPage);
