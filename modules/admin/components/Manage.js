import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../../core/containers/Navbar';

import Cookies from 'js-cookie';

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
     * -------------------------------------------------------------------------------- */
    renderUsersCard(user_id, key){
        const { usersList } = this.props;
        const user = usersList.byId[user_id];
        return(
            <div id="user-card" onClick={()=>this.gotoUserPortfolio(user._id)} key={key} className="card d-flex flex-row flex-wrap align-content-center align-items-center">
                <div className="card-image " >
                    <img src="/static/profile-pic.svg" className="align-content-center" height="60" width="60" />
                </div>
                <div className="flex-grow-1"></div>
                <div className="">
                    <span className="align-items-end">
                        {user.email}
                    </span>
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
     * Main Component
     * -------------------------------------------------------------------------------- */
    render(){
        const { usersList, userError, userSuccess } = this.props;
        return(
            <div>
                <Navbar />

                    <div className="margin-50"></div>

                    <div className="gradient-header">
                        {this.renderFormComponent()}
                    </div>
                    {
                      userSuccess && userSuccess.message ?
                        <div className="">
                            <div className="bs-component">
                                <div className="alert alert-dismissible alert-success">
                                    <p className="text-center">
                                        {userError.message}
                                    </p>
                                </div>
                            </div>
                        </div> : <div />
                    }

                    {
                      userError && userError.message ?
                        <div className="">
                            <div className="bs-component">
                                <div className="alert alert-dismissible alert-danger">
                                    <p className="text-center">
                                        {userError.message}
                                    </p>
                                </div>
                            </div>
                        </div> : <div />
                    }

                {/* ----------------------- */}
                {/* ------ User List ------ */}
                {/* ----------------------- */}
                <div className="card-container container bounceInUp animated">
                    {usersList.allIds.map((item, key) => this.renderUsersCard(item, key) )}
                </div>

                <style jsx global>{`
                        #user-card{
                            cursor: pointer;
                        }
                        #user-card:hover{
                            box-shadow: 3px 3px 7px #888;
                        }

                        #fh5co-home{
                            height: 162px;
                        }
                        .card-container{
                            margin-top: 15px;
                            max-width: 580px;
                            padding-bottom: 210px;
                        }
                        .card{
                            margin: 10px;
                            line-height: 1;
                            box-shadow: 1px 1px 3px #888;
                            padding: 10px;
                        }
                        .input-field{
                            background-color: #f1f1f1;
                            margin-right: 15px;
                        }
                        .user-add{
                            margin-top: 50px;
                        }
                        .error-container{
                            width: 250px;
                        }
                        .user-email{
                            margin: 0px;
                        }
                        .margin-50{
                            margin: 50px;
                        }
                        .btn-submit{
                        }
                `}</style>


            </div>
        )
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
            return userActions.errorSet({
                payload: {
                    message: 'Invalid email!',
                }
            })
        }

        if(email==='' || password===''){
            return userActions.errorSet({
                payload: {
                    message: 'Please fill up the input!',
                }
            })
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
     * before submit validate email
     * -------------------------------------------------------------------------------- */
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /* ----------------------------------------------------------------------------------
     * Route to update specific clients portfolio
     * -------------------------------------------------------------------------------- */
    gotoUserPortfolio(user_id){
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