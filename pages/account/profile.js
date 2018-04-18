import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';

import Layout from '../../modules/core/components/Layout';
import Profile from '../../modules/pages/containers/Profile'

import axios from 'axios';

class ProfilePage extends React.Component{

    static async getInitialProps({ store, req }) {

        const isServer = !!req;

        // coinmarketcap api fetch all data
        const apiCMCRes = await axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0');

        const coinmarketcapTicker = apiCMCRes.data;
        return { initialState: store.getState(), isServer, coinmarketcapTicker };
    }

    constructor(props) {
        super(props);
        this.store = initStore(props.initialState, props.isServer);
    }

    render(){
        return(
            <Provider store={this.store}>
                <Layout>
                    <Profile coinmarketcapTicker={this.props.coinmarketcapTicker}/>
                </Layout>
            </Provider>
        )
    }
}

ProfilePage.propTypes = {
    coinmarketcapTicker : PropTypes.array,
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(ProfilePage);
