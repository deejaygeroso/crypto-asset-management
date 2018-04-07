import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';

import Layout from '../../components/Layout';
import UserPortfolioAdd from '../../containers/admin/UserPortfolioAdd'

import axios from 'axios';

class UserPortfolioPage extends React.Component{

    static async getInitialProps({ store, req }) {
        const isServer = !!req;

        const apiRes = await axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0&&convert=ETH');

        return { initialState: store.getState(), isServer, coinmarketcapTicker: apiRes.data };
    }

    constructor(props) {
        super(props);
        this.store = initStore(props.initialState, props.isServer);
    }

    render(){
        return(
            <Provider store={this.store}>
                <Layout>
                    <UserPortfolioAdd coinmarketcapTicker={this.props.coinmarketcapTicker}/>
                </Layout>
            </Provider>
        )
    }

}

UserPortfolioPage.propTypes = {
    coinmarketcapTicker : PropTypes.array,
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(UserPortfolioPage);
