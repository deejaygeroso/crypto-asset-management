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
