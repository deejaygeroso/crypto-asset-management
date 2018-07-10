import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Router from 'next/router';

import HomeNavbar from '../../core/components/HomeNavbar';
import { ToastContainer } from 'react-toastify';
import { toasterErrorMessage } from '../../lib/helpers';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verificationCode : '',
            toggleMobileViewNavbar : false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /* ----------------------------------------------------------------------------------
     * Just get the currently logged in user 
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { userActions } = this.props;
        const userCookie = Cookies.get('user');

        // if user has no cookie redirect to login
        if(!userCookie){
            Router.push('/login');
        }else{
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object

            // do not fetch user when an admin
            if(user && user._id){
                if(user._id){
                    userActions.itemFind({
                        params: {
                            _id: user._id
                        }
                    })
                }
            }
            this.setState({user});
        }
    }

    /* ----------------------------------------------------------------------------------
     * Email verification form of user. 
     * -------------------------------------------------------------------------------- */
    renderVerifyForm(){
        return(
            <div className="login-page d-flex justify-content-center">
                <div className="card card-container">
                    <center><h1 className="title">Enter Verification Code</h1></center>
                    <center><span className="note">We have sent you an email with a verification code.</span></center>
                    <form className="form-signin formField">
                        <span id="reauth-email" className="reauth-email"></span>
                        <input
                             type="text"
                             id="verificationCode"
                             className="form-control inputField"
                             placeholder="Verification Code"
                             required
                             autoFocus
                             onChange={(evt)=>this.onChange('verificationCode', evt.target.value)}/>
                        <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-signin" type="submit" >Verify</button>
                    </form>
                </div>
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * Main Component. 
     * -------------------------------------------------------------------------------- */
    render(){
        const { toggleMobileViewNavbar } = this.state;
        return(
            <div>
                <ToastContainer />
                <HomeNavbar toggleMobileViewNavbar={toggleMobileViewNavbar} onToggle={()=>this.setState({toggleMobileViewNavbar: !toggleMobileViewNavbar})}/>

                <section id="fh5co-home" data-section="home" data-stellar-background-ratio="0.5">
                    <div className="gradient"></div>
                    <div className="container">
                        <div className="text-wrap display-grid">
                            <div className="margint-top-50">
                                <div className="col-md-8 col-md-offset-2">
                                    {this.renderVerifyForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {this.renderStyles()}
            </div>
        )
    }

    /* ----------------------------------------------------------------------------------
     * input changed 
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
        const { user, userActions } = this.props;
        const { verificationCode } = this.state;

        evt.preventDefault()

        if(verificationCode===''){
            return toasterErrorMessage('Please input your verification code!')
        }

        userActions.itemVerifyEmail({
            params: {
                _id: user._id,
                verificationCode,
            }
        })

    }

    /* ----------------------------------------------------------------------------------
     * Verify Css Styles
     * -------------------------------------------------------------------------------- */
    renderStyles(){
        return(
            <style jsx global>{`
                #fh5co-home{
                    height: 100vh;
                }
                .version-name{
                    font-size: 10px;
                    color: '#fff',
                }
                .card{
                    padding: 30px;
                    padding-bottom: 50px;
                    margin-top: 50px;
                    line-height: 1;
                    background-color: #fff;
                    box-shadow: 2px 2px 10px #888;
                    margin-top: 210px;
                    width: 580px;
                }
                .card-container{
                    max-width: 800px;
                }
                .formField{
                    margin-right: 15px;
                }
                .inputField{
                    margin: 10px;
                }
                .inputField-password{
                    margin-bottom: 10 !important;
                }
                .card-profile{
                    background-color: 'black';
                }
                .btn{
                    margin-left: 10px;
                }
                .password-label{
                    font-size: 12px;
                    pading: 0;
                    margin: 0;
                    margin-left: 14px;
                    padding-bottom: 12px !important;
                }
                .display-grid{
                    display: block !important;
                }
                .bs-component{
                    margin-left: 10px;
                    margin-right: -10px;
                }
                .bs-component > div {
                    margin-bottom: 10px;
                }
                .note{
                    color: #000;
                    text-align: center;
                }
                .title{
                    margin: 0 0 15px 0;
                    padding: 0;
                }
          `}</style>
        )
    }

}

VerifyEmail.propTypes = {
    user : PropTypes.object,
    userActions : PropTypes.object,
}

export default VerifyEmail;
