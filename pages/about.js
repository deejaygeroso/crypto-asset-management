import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';

import Layout from '../modules/core/components/Layout';
import About from '../modules/pages/components/About';

class AboutPage extends React.Component{

    static getInitialProps({ store, req }) {
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
                    <About />
                </Layout>
            </Provider>
        )
    }
}

AboutPage.propTypes = {
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(AboutPage);
