import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';

import Layout from '../components/Layout';
import Home from '../components/Home'


class App extends React.Component{

    static async getInitialProps({ store, req }) {

        const isServer = !!req;
        return { initialState: store.getState(), isServer };
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
                    <Home />
                </Layout>
            </Provider>
        )
    }
}

App.propTypes = {
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(App);
