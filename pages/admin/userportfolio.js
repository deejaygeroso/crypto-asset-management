import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';

import Layout from '../../components/Layout';
import UserPortfolio from '../../containers/admin/UserPortfolio'

import axios from 'axios';

class UserPortfolioPage extends React.Component{

    static async getInitialProps({ store, req }) {
        const isServer = !!req;

        const apiCMCGlobalRes = await axios.get('https://api.coinmarketcap.com/v1/global/');

        return { initialState: store.getState(), isServer, coinmarketcapGlobal: apiCMCGlobalRes.data };
    }

    constructor(props) {
        super(props);
        this.store = initStore(props.initialState, props.isServer);
    }

    render(){
        return(
            <Provider store={this.store}>
                <Layout>
                    <UserPortfolio coinmarketcapGlobal={this.props.coinmarketcapGlobal} />
                </Layout>
            </Provider>
        )
    }

}

UserPortfolioPage.propTypes = {
    coinmarketcapGlobal : PropTypes.object,
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(UserPortfolioPage);
