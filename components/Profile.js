import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../containers/Navbar';
import { EmailInput, PasswordInput, TextInput } from './forms';

import Cookies from 'js-cookie';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name       : '',
            email      : '',
            password   : '',
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /* ----------------------------------------------------------------------------------
     * Clear all when unmounted
     * -------------------------------------------------------------------------------- */
    componentWillUnmount(){
        const { userActions } = this.props;
        userActions.errorClear()
        userActions.successClear()
    }

    /* ----------------------------------------------------------------------------------
     * Find user then Update the fields of the form
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { user, userActions } = this.props;

        const userCookie = Cookies.get('user');
        if(userCookie){
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            if(user && user._id){
                if(user._id){
                    userActions.itemFind({
                        params: {
                            _id: user._id
                        }
                    })
                }
            }
        }

        this.setState({
            name       : user && user.name ? user.name : '',
            email      : user && user.email ? user.email : '',
            password   : '',
        })
    }

    /* ----------------------------------------------------------------------------------
     * Update form fields
     * -------------------------------------------------------------------------------- */
    componentWillReceiveProps(nextProps){
        const { user } = nextProps;
        this.setState({
            name       : user && user.name ? user.name : '',
            email      : user && user.email ? user.email : '',
            password   : '',
        })
    }

    /* ----------------------------------------------------------------------------------
     * Main Page
     * -------------------------------------------------------------------------------- */
    render(){
        const { userError, userSuccess } = this.props;

        return(
        <div>
            <Navbar />

            <div className="card container flex-column align-items-center justify-content-center ">
                <div className="card-image-wrapper d-flex align-items-center justify-content-center">

                  <img src="/static/profile-pic.svg" className="cryptoImage align-content-center" height="110" width="110"/>
              </div>


                <div className="fadeIn animated">
                   <div className=".card-profile">

                       <form className="form-signin">

                           {
                                userError && userError.message ?
                                <div className="bounceIn animated">
                                    <div className="bs-component">
                                        <div className="alert alert-dismissible alert-danger">
                                            {userError.message}
                                        </div>
                                    </div>
                                </div> : <div />
                            }

                           {
                                userSuccess && userSuccess.message ?
                                <div className="bounceIn animated">
                                    <div className="bs-component">
                                        <div className="alert alert-dismissible alert-success">
                                            {userSuccess.message}
                                        </div>
                                    </div>
                                </div> : <div />
                            }

                            <TextInput     id="name"  value={this.state.name}  label="Full Name" placeholder="Full Name" onValueChange={this.onValueChange} />
                            <EmailInput    id="email" value={this.state.email} label="Email"     placeholder="Email"     onValueChange={this.onValueChange} />
                            <PasswordInput id="password" label="Password"  placeholder="Password"  onValueChange={this.onValueChange} />

                            <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-signin" type="submit" >Update</button>
                       </form>
                   </div>
                </div>

                {this.renderStyle()}

            </div>
        </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Update state when input value has changed
     * -------------------------------------------------------------------------------- */
    onValueChange(key, value){
        let inputData = []
        inputData[key] = value;
        this.setState(inputData);
    }

    /* ----------------------------------------------------------------------------------
     * When user press submit button
     * -------------------------------------------------------------------------------- */
    onSubmit(evt){
        evt.preventDefault()

        const { user, userActions } = this.props;
        const { name, email, password, value } = this.state;

        userActions.errorClear()
        userActions.successClear()

        if(email===''){
            userActions.successClear();
            return userActions.errorSet({
                payload: {
                    message: 'Email must not be empty!',
                }
            })
        }

        const params = {
            _id: user._id,
            name,
            email,
            crypto_ids: value,
        }

        if(password!==''){
            params['password'] = password;
        }

        userActions.itemUpdate({ params });
    }

    /* ----------------------------------------------------------------------------------
     * Profile Style
     * -------------------------------------------------------------------------------- */
    renderStyle(){
        return(
            <style jsx global>{`
                    .card{
                        padding: 15px 30px 30px 30px;
                        padding-bottom: 50px;
                        line-height: 1;
                        box-shadow: 2px 2px 5px #888;
                        max-width: 680px;
                        margin-bottom: 120px;
                        margin-top: 80px;
                    }
                    .card-image-wrapper{
                        margin: 20px;
                    }
                    .inputField{
                      padding: 10px;
                      margin-left: 0px !important;
                      padding-left: 20px;
                    }
                    .Select{
                    }
                    .Select-control{
                        margin: 0px !important;
                        padding: 0px !important;
                        border-width: 0px;
                        margin-left: 10px !important;
                        margin-top: 5px !important;
                    }
                    .select-field{
                        border: 2px solid rgba(0, 0, 0, 0.1);
                        padding: 0 0 10px 0px;
                        padding-right: 10px;                    }
                    .inputField-password{
                      margin-bottom: 10px !important;
                      margin-left: 0px !important;
                      padding-left: 20px;
                    }
                    .card-profile{
                      background-color: 'black';
                    }
                    .password-label{
                      font-size: 12px;
                      pading: 0;
                      margin: 0;
                      margin-left: 14px;
                      padding-bottom: 12px !important;
                    }
                    @media (max-width: 700px) {
                        .card{
                            margin-left: 20px;
                            margin-right: 20px;
                        }
                    }
          `}</style>
        )
    }

}

Profile.propTypes = {
    user: PropTypes.object,
    userError: PropTypes.object,
    userSuccess: PropTypes.object,
    userActions: PropTypes.object,
    cryptoIds: PropTypes.array,
    cryptoIdsActions: PropTypes.object,

}

export default Profile;
