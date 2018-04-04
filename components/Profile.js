import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Navbar from '../containers/Navbar';

import Cookies from 'js-cookie';
import { pluck as __$pluck } from 'underscore';
import Select from 'react-select';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            crypto_ids : [],
            name       : '',
            email      : '',
            password   : '',
            value      : [],
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // carefull when loggin in if no cookies error will have in ur way
    componentDidMount(){
        const { user, userActions, cryptoIdsActions } = this.props;
        const userCookie = Cookies.get('user');

        cryptoIdsActions.cryptoIdsFindAll();

        // if user has no cookie redirect to login
        if(!userCookie){
            Router.push('/login');
        }else{
            const params = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            if(params && params._id){
                if(params._id) userActions.userFind({params});
            }else{
                Router.push('/login');
            }
        }

        this.setState({
            crypto_ids : user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
            name       : user && user.name ? user.name : '',
            email      : user && user.email ? user.email : '',
            password   : '',
            value      : user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
        })
    }

    componentWillUnmount(){
        const { userActions } = this.props;
        userActions.userErrorClear()
        userActions.userSuccessClear()
    }

    componentWillReceiveProps(nextProps){
        const { user } = nextProps;
        this.setState({
            crypto_ids : user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
            name       : user && user.name ? user.name : '',
            email      : user && user.email ? user.email : '',
            password   : '',
            value      : user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
        })
    }

    render(){
        const { userError, userSuccess, cryptoIds } = this.props;
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


                           <Select
                                name="form-field-name"
                                value={this.state.value}
                                onChange={this.handleChange}
                                multi={true}
                                options={cryptoIds}
                                placeholder="Select your favourite(s)"
                                className="select-field"
                            />
                           <input
                                type="text"
                                id="name"
                                value={this.state.name}
                                className="form-control inputField"
                                placeholder="Full name"
                                style={{margin: 10}}
                                onChange={(evt)=>this.onChange('name', evt.target.value, evt)}/>
                           <input
                                type="email"
                                id="email"
                                value={this.state.email}
                                className="form-control inputField"
                                placeholder="Email address"
                                required
                                style={{margin: 10}}
                                onChange={(evt)=>this.onChange('email', evt.target.value, evt)}/>
                           <input
                                type="password"
                                id="password"
                                value={this.state.password}
                                className="form-control inputField-password"
                                placeholder="Password"
                                style={{margin: 10}}
                                autoComplete="off"
                                onChange={(evt)=>this.onChange('password', evt.target.value, evt)}/>
                                <p className="password-label">You can leave password empty if you dont wanna change it.</p>
                            <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block btn-signin" type="submit" >Update</button>
                       </form>
                   </div>
                </div>

                {this.renderStyle()}

            </div>
        </div>
        )
    }

    onChange(key, value, evt){
        evt.preventDefault();
        let inputData = []
        inputData[key] = value;
        this.setState(inputData);
    }

	handleChange (input) {
        const value = __$pluck(input, 'value');
		this.setState({ value });
	}

    onSubmit(evt){
        evt.preventDefault()

        const { user, userActions } = this.props;
        const { name, email, password, value } = this.state;

        userActions.userErrorClear()
        userActions.userSuccessClear()

        if(email===''){
            userActions.userSuccessClear();
            return userActions.userErrorSet({
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

        userActions.userUpdate({ params });
    }

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
