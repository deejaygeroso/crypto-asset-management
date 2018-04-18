import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';

import Layout from '../modules/core/components/Layout';
import Login from '../modules/pages/containers/Login'


class LoginPage extends React.Component{

    static async getInitialProps({ store, req }) {
        const isServer = !!req;
        return { initialState: store.getState(), isServer };
    }

    constructor(props) {
        super(props);
        this.store = initStore(props.initialState, props.isServer);
    }

    render(){
        return(
            <Provider store={this.store}>
                <Layout>
                    <Login />
                </Layout>
            </Provider>
        )
    }
}

LoginPage.propTypes = {
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(LoginPage);
