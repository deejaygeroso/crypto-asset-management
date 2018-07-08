import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../../core/containers/Navbar';

import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert'; 
import { ToastContainer } from 'react-toastify';
import { toasterErrorMessage } from '../../lib/helpers';
import ManageStyles from '../../styles/ManageStyles';

import moment from 'moment';

class Manage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.gotoUserPortfolio = this.gotoUserPortfolio.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
        this.onUserDisabled = this.onUserDisabled.bind(this);
        // this.verifyUser = this.verifyUser.bind(this); (hack)
    }

    /* ----------------------------------------------------------------------------------
     * Find all user
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { userActions } = this.props;
        userActions.itemListFindAll();
    }

    /* ----------------------------------------------------------------------------------
     * Clear All user error so no errors will be found when navigating to portfolio form
     * -------------------------------------------------------------------------------- */
    componentWillUnmount(){
        this.props.userActions.errorClear()
    }

    /* ----------------------------------------------------------------------------------
     * User's Card
     * Not Used Anymore
     * -------------------------------------------------------------------------------- */
    renderUsersCard(user_id, key){
        const { usersList } = this.props;
        const user = usersList.byId[user_id];
        return(
            <div id="user-card" onClick={()=>this.gotoUserPortfolio(user._id)} key={key} className="card d-flex flex-row flex-wrap align-content-center align-items-center">
                <div className="card-image " >
                    <img src="/static/profile-pic.svg" className="align-content-center" height="60" width="60" />
                    &nbsp;&nbsp;{user.email}
                </div>
                <div className="flex-grow-1"></div>
                <div className="d-flex  flex-row align-items-center justify-content-center">
                    <span className="align-items-end" style={{paddingRight: 20}}>
                        {/* {user.email} */}
                    </span>
                    <button onClick={(e)=>this.onUserDelete(e, user)} className="btn btn-lg btn-danger btn-block btn-submit" type="button">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Form for adding new user
     * -------------------------------------------------------------------------------- */
    renderFormComponent(){
        return(
            <div className="user-add d-flex align-items-center justify-content-center fadeIn animated" >
                <div>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <label className="sr-only">Email</label>
                            <input
                                type="email"
                                id="Email"
                                className="form-control input-field"
                                placeholder="Email address"
                                value={this.state.email}
                                required
                                autoFocus
                                onChange={(evt)=>this.onChange('email', evt.target.value)}/>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                id="Password"
                                className="form-control input-field"
                                placeholder="Password"
                                value={this.state.password || ''}
                                required
                                onChange={(evt)=>this.onChange('password', evt.target.value)}/>
                        </div>
                        <div className="form-group">
                            <button onClick={this.onSubmit} className="btn btn-warning btn-block btn-submit" type="submit" >Add User</button>
                        </div>
                    </form>
                </div>
            </div>


        )
    }

    /* ----------------------------------------------------------------------------------
     * Render Data table for user list 
     * -------------------------------------------------------------------------------- */
    renderUserListDataTable(){
        const { usersList } = this.props;
        return(
            <div className="table-view table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" rowSpan="2" className="">Email</th>
                            <th scope="col" rowSpan="2" className="">First Name</th>
                            <th scope="col" rowSpan="2" className="">Last Name</th>
                            <th scope="col" rowSpan="2" className="">Is Verified</th>
                            <th scope="col" rowSpan="2" className="">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.allIds.map((_id, key) => (
                            <tr id="portfolio-tr" key={key}>
                                <td scope="col">
                                    {usersList.byId[_id].email}
                                </td>
                                <td scope="col">
                                    {usersList.byId[_id].firstname}
                                </td>
                                <td scope="col">
                                    {usersList.byId[_id].lastname}
                                </td>
                                <td scope="col">
                                    {usersList.byId[_id].isVerified ? "Verified" : "Pending"}
                                </td>
                                <td scope="col">
                                    {/* <button className="btn btn-success btn-action" onClick={(e)=>this.verifyUser(e, _id)}>Verify User</button> */}
                                    <button className="btn btn-info btn-action" onClick={(e)=>this.gotoUserPortfolio(e, _id)}>View</button>
                                    {/* { usersList.byId[_id].isDisabled ? 
                                        <button className={"btn btn-success btn-action"} onClick={(e)=>this.onUserDisabled(e, usersList.byId[_id])}>Enable</button> :
                                        <button className={"btn btn-warning btn-action"} onClick={(e)=>this.onUserDisabled(e, usersList.byId[_id])}>Disable</button>
                                    } */}
                                    <button className="btn btn-danger  btn-action" onClick={(e)=>this.onUserDelete(e, usersList.byId[_id])}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Main Component
     * -------------------------------------------------------------------------------- */
    render(){
        return(
            <div>
                <ToastContainer />
                <Navbar />

                <div className="margin-50"></div>

                <div className="gradient-header">
                    {/* {this.renderFormComponent()} */}
                </div>

                {/* -------------------------- */}
                {/* -- User List Data Table -- */}
                {/* -------------------------- */}

                {this.renderUserListDataTable()}
            
                <ManageStyles />
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * (Hack) for validating user 
     * -------------------------------------------------------------------------------- */
    // verifyUser(evt, user_id){
    //     const { userActions } = this.props;

    //     evt.preventDefault();

    //     userActions.itemVerifyEmailByAdmin({
    //         params: {
    //             _id: user_id
    //         }
    //     });
    // }

    /* ----------------------------------------------------------------------------------
     * Count number of days from now from a given input date
     * -------------------------------------------------------------------------------- */
    countDaysLeftFromNow(date){
        var a = moment(new Date(date));
        var b = moment(new Date());
        var diffInDays = a.diff(b, 'days'); // 1 day
        return diffInDays;
    }

    /* ----------------------------------------------------------------------------------
     * On Change update state for the form
     * -------------------------------------------------------------------------------- */
    onChange(key, value){
        let inputData = []
        inputData[key] = value;
        this.setState(inputData);
    }

    /* ----------------------------------------------------------------------------------
     * Add new user
     * -------------------------------------------------------------------------------- */
    onSubmit(evt){
        const { userActions } = this.props;
        const { email, password } = this.state;

        evt.preventDefault()

        if(!this.validateEmail(email)){
            return toasterErrorMessage('Invalid email!')
        }

        if(email==='' || password===''){
            return toasterErrorMessage('Please fill up all the input fields!')
        }

        userActions.itemCreate({
            params: {
                email,
                password,
            }
        });

        this.setState({email: '', password: ''});
    }

    /* ----------------------------------------------------------------------------------
     * Disable user from logging in 
     * -------------------------------------------------------------------------------- */
    onUserDisabled(e, user){
        e.stopPropagation();
        const { userActions } = this.props;

        confirmAlert({
            title: 'Are you sure?',
            message: `You are about to disable ${user.email}. Account will no longer be able to login.`,
            buttons: [
                {
                    label: user.isDisabled ? 'Enable' : 'Disable',
                    onClick: () => {
                        userActions.itemIsDisabled({
                            _id : user._id,
                            isDisabled : !user.isDisabled,
                        })
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {}
                }
            ]
        });
    }

    /* ----------------------------------------------------------------------------------
     * Delete a certain user (Soft Delete)
     * -------------------------------------------------------------------------------- */
    onUserDelete(e, user){
        e.stopPropagation();
        const { userActions } = this.props;
        
        confirmAlert({
            title: 'Are you sure?',
            message: `You are about to delete ${user.email}.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => {
                        userActions.itemRemove({
                            _id : user._id,
                        })
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {}
                }
            ]
        });
    }

    /* ----------------------------------------------------------------------------------
     * before submit validate email
     * -------------------------------------------------------------------------------- */
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /* ----------------------------------------------------------------------------------
     * Route to update specific clients portfolio
     * -------------------------------------------------------------------------------- */
    gotoUserPortfolio(evt, user_id){
        evt.preventDefault()
        const { userActions } = this.props;

        // might have some issue with asnycronousity of data especially when updating or adding of user
        userActions.itemFind({
            params: {
                _id : user_id,
            }
        });

        Cookies.set('user_id', user_id, { expires: 1 });

        Router.push({
            pathname: '/admin/userportfolio',
        });

    }

}

Manage.propTypes = {
    user        : PropTypes.object,
    userError   : PropTypes.object,
    userSuccess : PropTypes.object,
    usersList   : PropTypes.object,
    userActions : PropTypes.object,
}

export default Manage;
