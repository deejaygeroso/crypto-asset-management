import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

class Navbar extends Component{

    constructor(){
        super();
        this.state = {
            user: {},
            toggleMobileViewNavbar: false,
        }
        this.userLogout = this.userLogout.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }

    componentDidMount(){
        const userCookie = Cookies.get('user');

        // if user has no cookie redirect to login
        if(!userCookie){
            Router.push('/login');
        }else{
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object
            this.setState({user});
        }
    }

    render(){
        const { user, toggleMobileViewNavbar } = this.state;
        return(
                <header role="banner" id="fh5co-header" className="navbar-fixed-top slideInDown">
                    <div className="container">
                        {/*-- <div className="row"> --*/}
                        <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            {/*-- Mobile Toggle Menu Button --*/}
                            <a href="#" onClick={()=>this.setState({toggleMobileViewNavbar: !toggleMobileViewNavbar})} className="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                         <Link prefetch href="/portfolio/list"><a className="navbar-brand" href="">BlockPSV</a></Link>
                         <Link prefetch href="/subscribe"><a className="subscribe" href="">Subscribe Now!</a></Link>
                         <div className="days-left">7 days left before trial expires! Upgrade Now.</div>
                        </div>
                        <div id="navbar" className={toggleMobileViewNavbar? "navbar-collapse collapse in" : "navbar-collapse collapse"}>
                          <ul className="nav navbar-nav navbar-right">
                            { user && user.isLoggedIn ? <li><Link prefetch href="/portfolio/list"><a className={this.getClassName('portfolio')}>Portfolio</a></Link></li> : <span /> }
                            { user && user.isLoggedIn ? <li><Link prefetch href="/account/profile"><a className={this.getClassName('account')}>Profile</a></Link></li> : <span /> }
                            { user && user.isAdmin    ? <li><Link prefetch href="/admin/manage"><a className={this.getClassName('admin')}>Manage</a></Link></li> : <span /> }
                            { user && user.isLoggedIn ? <li><a href="#" onClick={this.userLogout}>Logout</a></li> : <span /> }
                          </ul>
                        </div>
                        </nav>
                      {/*-- </div> --*/}
                  </div>
                    <style jsx global>{`
                        .active-link{
                            color: #52d3aa !important;
                        }
                        .subscribe{
                            background: #f0ad4e;
                            padding: 4px 15px;
                            margin-top: 9px;
                            float: left;
                            display: block;
                            border-radius: 20px;
                            color: #fff !important;
                            text-decoration: none !important;
                        }
                        .subscribe:hover{
                            text-decoration: none;
                            color: #fff;
                            background-color: #f69b1b;
                        }
                        .days-left{
                            float: left;
                            margin-top: 16px;
                            margin-left: 10px;
                            font-size: 16px;
                            color: #ff4503;
                        }
                    `}</style>
                </header>
        );
    }

    getClassName(routeName){
        const routeNameSplit = Router.pathname.split('/')
        if(routeNameSplit[1]===routeName){
            return "active-link";
        }
        return "";
    }

    userLogout(evt){
        evt.preventDefault();
        this.props.userActions.logout();
    }
}

Navbar.propTypes = {
    userActions: PropTypes.object,
}

export default Navbar;
