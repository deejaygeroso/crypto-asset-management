import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HomeNavbar from '../../core/components/HomeNavbar';
import { ToastContainer } from 'react-toastify';
import { toasterErrorMessage } from '../../lib/helpers';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            toggleMobileViewNavbar : false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /* ----------------------------------------------------------------------------------
     * Sign up form. 
     * -------------------------------------------------------------------------------- */
    renderSignupForm(){
        return(
            <div className="login-page d-flex justify-content-center">
               <div className="card card-container">
                   {/*
                       <img className="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" />
                       <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                  */}
                    <center><h1>Sign Up</h1></center>

                    <form className="form-signin formField">
                        <span id="reauth-email" className="reauth-email"></span>
                        <input
                             type="text"
                             id="username"
                             className="form-control inputField"
                             placeholder="Username"
                             required
                             autoFocus
                             onChange={(evt)=>this.onChange('username', evt.target.value)}/>
                        <input
                             type="email"
                             id="Email"
                             className="form-control inputField"
                             placeholder="Email address"
                             required
                             autoFocus
                             onChange={(evt)=>this.onChange('email', evt.target.value)}/>
                        <input
                             type="password"
                             id="Password"
                             className="form-control inputField"
                             placeholder="Password"
                             value={this.state.password}
                             required
                             onChange={(evt)=>this.onChange('password', evt.target.value)}/>
                        <button onClick={this.onSubmit} disabled className="btn btn-lg btn-primary btn-block btn-signin" type="submit" >Sign up</button>

                        <br />
                        <center><h5>"We will be launching Q4 2018"</h5></center>
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
                                    {this.renderSignupForm()}
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
     * When data is change update the state. 
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
        const { username, email, password } = this.state;

        evt.preventDefault()

        if(!this.validateEmail(email)){
            return toasterErrorMessage('Invalid email!')
        }

        if(username==='' || email==='' || password===''){
            return toasterErrorMessage('Please fill up all the input fields!')
        }

        userActions.itemCreate({
            params: {
                username,
                email,
                password,
            }
        });

        this.setState({username: '', email: '', password: ''});
    }

    /* ----------------------------------------------------------------------------------
     * before submit validate email
     * -------------------------------------------------------------------------------- */
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /* ----------------------------------------------------------------------------------
     * Styles for this component 
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
          `}</style>
        )
    }

}

Login.propTypes = {
    userActions : PropTypes.object,
}

export default Login;
