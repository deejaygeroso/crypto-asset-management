import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Card from './crypto/Card';
import Header from './crypto/Header';
import Navbar from '../containers/Navbar';
import Cookies from 'js-cookie';


class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            coin: '',
            crypto_ids: [],
            email: '',
            password: '',
            value: [],
        }
    }

    // carefull when loggin in if no cookies error will have in ur way
    componentDidMount(){
        const { user, userActions } = this.props;

        const userCookie = Cookies.get('user');

        // if user has no cookie redirect to login
        if(!userCookie){
            Router.push('/login');
        }else{
            const params = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            if(params._id) userActions.userFind({params});
        }

        this.setState({
            coin: user && user.coin ? user.coin : '',
            crypto_ids: user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
            email: user && user.email ? user.email : '',
            password: '',
            value : user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
        })

    }

    componentWillUnmount(){
        // this.props.userActions.userErrorClear()
    }

    componentWillReceiveProps(nextProps){
        const { user } = nextProps;
        this.setState({
            coin: user && user.coin ? user.coin : '',
            crypto_ids: user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
            email: user && user.email ? user.email : '',
            password: '',
            value : user && user.crypto_ids && user.crypto_ids.length!==0 ? user.crypto_ids : [],
        })
    }


    render(){
        const { cryptoList, cryptoHistory, cryptoAtl, cryptoAth, cryptoGlobal } = this.props;
        return(
            <div className="page-container">
                <Navbar />
                <Header isWelcome={cryptoList && cryptoList.allIds && cryptoList.allIds.length!==0} cryptoGlobal={cryptoGlobal} />
                <div className="">
                    <div className="d-flex align-content-around flex-wrap justify-content-center">

                        {
                            cryptoList && cryptoList.allIds && cryptoList.allIds.length===0 ?
                                <div className="pulse container animated ">
                                    <button onClick={()=>Router.push('/account/profile')} className="btn btn-lg btn-primary btn-block btn-welcome" type="submit">
                                        Get started by setting up your Profile
                                    </button>
                                </div>
                            : <div></div>
                        }

                        {/* I might need to review this because I already stripped out non usable data from cryptoList */}
                        <div className="d-flex crypto-container flex-wrap justify-content-center bounceInUp animated">
                            {
                                cryptoList && cryptoList.allIds && cryptoList.allIds.map((_id, key)=>(
                                    <div key={key}>
                                        {_id ? <Card crypto={cryptoList.byId[_id]} cryptoHistory={cryptoHistory} cryptoAth={cryptoAth} cryptoAtl={cryptoAtl} /> : <div/> }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <style jsx global>{`
                        .page-container{
                            background-color: #f1f1f1;
                            padding-top: 50px;
                        }
                        .align-center{
                            text-align: center;
                        }
                        .btn-welcome{
                            margin-top: 40px;
                        }
                        .crypto-container{
                            margin-top: 20px;
                            margin-bottom: 80px;
                        }
                    `}</style>

                </div>
            </div>
        )
    }

    capitalizeFirstCharacterOfString(name){
        return name.charAt(0).toUpperCase() + name.substr(1);
    }
}

User.propTypes = {
    user              : PropTypes.object,
    userActions       : PropTypes.object,
    userError         : PropTypes.object,
    userSuccess       : PropTypes.object,
    cryptoList        : PropTypes.object,
    cryptoListActions : PropTypes.object,
    cryptoAth         : PropTypes.object,
    cryptoAtl         : PropTypes.object,
    cryptoHistory     : PropTypes.object,
    cryptoGlobal      : PropTypes.object,
}

export default User;
