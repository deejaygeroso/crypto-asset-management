import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormStyle from '../styles/FormStyle';
import { TextInput } from '../../lib/forms';
import { confirmAlert } from 'react-confirm-alert';

import Cookies from 'js-cookie';

class FormLink extends Component {

    constructor(props){
        super(props);
        this.state = {
            links: [],
        }
        this.addNewLinks = this.addNewLinks.bind(this);
        this.onLinkValueChange = this.onLinkValueChange.bind(this);
    }

    /* ----------------------------------------------------------------------------------
     * Update the fields of the form
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { linkList } = this.props;

        const newLinks = [];
        linkList && linkList.allIds && linkList.allIds!==0 && linkList.allIds.map(_id=>{
            newLinks.push(linkList.byId[_id]);
        })

        this.setState({
            links : newLinks,
        })

    }

    renderAddNewLinks(){
        const { links } = this.state;
        const linksComponent = [];
        links && links.length!==0 && links.map((link, index)=>{
            linksComponent.push(
                <div className="buy-price-wrapper row" key={index}>
                    <div className="col-md-1 col-sm-1">
                    {
                        link.isApproved ?
                        <i className="fas fa-lg fa-check-circle status-indicator" dataToggle="tooltip" title="Approved!"></i>
                        : <i className="fas fa-lg fa-exclamation-circle waiting-indicator" dataToggle="tooltip" title="Waiting for approval!"></i>
                    }
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <TextInput id="name" value={link.name} label="Name" placeholder="Link Name" onValueChange={(fieldName, value)=>this.onLinkValueChange(fieldName, value, index)} />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextInput id="address" value={link.address} label="Address" placeholder="Link Address" onValueChange={(fieldName, value)=>this.onLinkValueChange(fieldName, value, index)} />
                    </div>
                    <div className="col-md-2 col-sm-2" style={{marginTop: 18}}>
                        <button onClick={()=>this.removeLink(index, link._id)} className="btn btn-lg btn-danger btn-block btn-submit" type="button">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="col-md-2 col-sm-2" style={{marginTop: 18}}>
                        <button onClick={()=>this.saveLink(index)} className="btn btn-lg btn-success btn-block btn-submit" type="button">
                            <i className="fas fa-lg fa-save"></i>
                        </button>
                    </div>
                </div>
            )
        })
        return linksComponent;
    }

    render(){
        return (
            <div className="page-container">
                <div className="card container flex-column align-items-center justify-content-center fadeIn animated">
                        {/* ------------------------------*/}
                        {/* ---- Links Form & Button ---- */}
                        {/* ------------------------------*/}
                        <p className="form-title mb-5 add-link-button" onClick={this.addNewLinks}>
                            Click Here to Add Links
                            &nbsp;
                            <i className="fas fa-plus add-link-button"></i>
                        </p>

                        {/* ------------------------------*/}
                        {/* ----- Dynamic Links Form ---- */}
                        {/* ------------------------------*/}
                        {this.renderAddNewLinks()}

                        <FormStyle />
                </div>
            </div>
        );
    }

    /* ----------------------------------------------------------------------------------
     * Update the value of the selected link 
     * -------------------------------------------------------------------------------- */
    onLinkValueChange(fieldName, value, index){
        const { links } = this.state;
        links[index][fieldName]=value;
        this.setState({links});
    }

    /* ----------------------------------------------------------------------------------
     * Add New Link Form 
     * -------------------------------------------------------------------------------- */
    addNewLinks(){
        const { links } = this.state;
        const newLink = {
            name   : '',
            address : '',
        }
        links.push(newLink);
        this.setState({links});
    }

    saveLink(index){
        const { itemActions, user, portfolio } = this.props;

        const { links } = this.state;
        const link = Object.assign(links[index]);
        link['user_id'] = user._id;
        link['isApproved'] = user.isAdmin ? true : false;
        link['id'] = portfolio.id;

        /*
         * This is used if logged in user is admin so only admin can approve links
         */
        const mainUserCookie = Cookies.get('user');
        const mainUser = JSON.parse(mainUserCookie.slice(2)); // remove j: from the string then convert to object
        if(mainUser && mainUser.isAdmin){
            link['isApproved'] = true;
        }

        if(link && link._id){
            itemActions.apiCallUpdate({
                serviceName: 'link',
                item: link,
            })
        }else{
            itemActions.apiCallCreate({
                serviceName: 'link',
                item: link,
            })
        }
    }

    /* ----------------------------------------------------------------------------------
     * Remove selected link 
     * -------------------------------------------------------------------------------- */
    removeLink(index, linkId){
        const { itemActions } = this.props;
        const { links } = this.state;
        
        // if links are just empty then delete anyway
        if(links[index].name==='' && links[index].symbol===''){
            links.splice(index, 1);
            this.setState({links})
        }else{
            // if links are not empty or has changes then confirm user deletion
            confirmAlert({
                title: 'Are you sure?',
                message: 'You are about to remove this Link.',
                buttons: [
                    {
                        label: 'Delete',
                        onClick: () => {
                            links.splice(index, 1);
                            this.setState({links});
                            itemActions.apiCallRemove({
                                serviceName: 'link',
                                _id: linkId,
                            });
                        }
                    },
                    {
                        label: 'Cancel',
                        onClick: () => {}
                    }
                ]
            });
        }
    }

}

FormLink.propTypes = {
    user : PropTypes.object,
    itemActions : PropTypes.object,
    linkList : PropTypes.object,
    portfolio : PropTypes.object,
};

export default FormLink;