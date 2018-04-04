import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';

import Layout from '../../components/Layout';
import PortfolioAdd from '../../containers/PortfolioAdd'


class PortfolioAddPage extends React.Component{

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
                    <PortfolioAdd />
                </Layout>
            </Provider>
        )
    }
}

PortfolioAddPage.propTypes = {
    initialState : PropTypes.object,
    isServer : PropTypes.bool,
}

export default withRedux(initStore)(PortfolioAddPage);
