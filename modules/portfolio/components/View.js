import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../core/containers/Navbar';
import Form from '../containers/Form';
import FormLink from '../containers/FormLink';
import ViewData from './ViewData';
import ViewLink from './ViewLink';

import ViewStyle from '../styles/ViewStyles';

import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';

class View extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLinkVisible: false,
            isDataVisible: true,
            isFormDataVisible: false,
            isFormLinkVisible: false,
        }
        this.onFormDataSubmit = this.onFormDataSubmit.bind(this);
    }

    componentDidMount(){
        const { portfolioActions, itemListActions, cryptoChartsActions } = this.props;
        const portfolioCookie = Cookies.get('portfolio');
        const portfolio = JSON.parse(portfolioCookie);

        // cryptoCharts
        cryptoChartsActions.findByQuery({
            serviceName: 'cryptos',
            query: {
                id: portfolio.id,
            }
        })

        // linkList
        itemListActions.findByQuery({
            serviceName: 'link',
            query: {
                id: portfolio.id,
            }
        });

        // find portfolio from the database
        portfolioActions.itemFind({
            _id: portfolio._id,
        });

        // show portfolio form instead of the view info if user is in create portfolio mode
        if(!(portfolio && portfolio._id)){
            this.setState({isFormDataVisible: true});
        }

    }

    /* ----------------------------------------------------------------------------------
     * Render create/update portfolio form
     * -------------------------------------------------------------------------------- */
    renderForm() {
        return <Form portfolioMainPageRouteName={this.props.portfolioMainPageRouteName} onSubmit={this.onFormDataSubmit} onRemove={()=>{}}/>
    }

    renderFormLink(){
        return <FormLink />
    }

    /* ----------------------------------------------------------------------------------
     * Message after coin is removed. 
     * -------------------------------------------------------------------------------- */
    renderDataRemovedMessage(){
        return(
            <div style={{marginTop: 90, textAlign: 'center'}}>
                <p style={{fontSize: 50, color: '#fff'}}>
                    Coin Removed!
                </p>
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { portfolio, linkList, cryptoChartsList } = this.props;
        const { isLinkVisible, isDataVisible, isFormDataVisible, isFormLinkVisible } = this.state;
        return(
            <div className="page-container">
                <ToastContainer />
                <Navbar />
                {/* ------------------------------*/}
                {/* ------------ Form ----------- */}
                {/* ------------------------------*/}
                <div className="gradient-header">
                    {
                        (isFormDataVisible || isFormLinkVisible) ? <div/> :
                            <div>
                                <div className="col-md-6">
                                    <ViewData portfolio={portfolio} onEdit={()=>this.setState({isFormDataVisible: true})}/>
                                </div>
                                <div className="col-md-6">
                                    <ViewLink portfolio={portfolio} linkList={linkList} onEdit={()=>this.setState({isFormLinkVisible: true})} cryptoChartsList={cryptoChartsList}/>
                                </div>
                            </div>
                    }
                    {
                        isFormLinkVisible ? this.renderFormLink() : <div />
                    }
                    {
                        isFormDataVisible ? this.renderForm() : <div />
                    }
                </div>

                {/* ------------------------------*/}
                {/* ------ Edit Form Button ----- */}
                {/* ------------------------------*/}
                {
                    isFormLinkVisible || isFormDataVisible ? 
                        portfolio && portfolio._id ?
                            <span onClick={()=>this.setState({isFormDataVisible: false, isFormLinkVisible: false})} className="flip animated edit-button">
                                <i className="fas fa-lg fa-times fa-button-icon"></i>
                            </span>
                        : <div/>
                    : <div/>
                }

                {/* ------------------------------*/}
                {/* ------ Link Form Button ----- */}
                {/* ------------------------------*/}
                {/* {
                    isFormDataVisible || isFormLinkVisible ? <div /> :
                    <span onClick={()=>this.setState({isLinkVisible: !isLinkVisible, isDataVisible: !isDataVisible})} className="flip animated chart-button">
                        { isLinkVisible ? <i className="fab fab-lg fa-bitcoin fa-button-icon"></i> : 
                        <i className="fas fa-lg fa-chart-bar fa-button-icon"></i> }
                    </span>
                } */}

                {/* ------------------------------*/}
                {/* --------- Back Button ------- */}
                {/* ------------------------------*/}
                <span onClick={()=>window.history.back()} className="flip animated back-button">
                    <i className="fas fa-lg fa-chevron-left fa-button-icon"></i>
                </span>

                <ViewStyle />
            </div>
        )
    }

    onFormDataSubmit(portfolio){
        const { itemListActions } = this.props;
        this.setState({isFormDataVisible: false});

        itemListActions.findByQuery({
            serviceName: 'link',
            query: {
                id: portfolio.id,
            }
        });
    }
}

View.propTypes = {
    linkList : PropTypes.object,
    itemListActions : PropTypes.object,
    portfolio : PropTypes.object,
    portfolioSuccess : PropTypes.object,
    portfolioError: PropTypes.object,
    portfolioActions: PropTypes.object,
    portfolioMainPageRouteName : PropTypes.string,
    cryptoChartsList : PropTypes.array,
    cryptoChartsActions : PropTypes.object,
};

export default View;