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
                         <a className="navbar-brand" href="index.html">BlockPSV</a>
                        </div>
                        <div id="navbar" className={toggleMobileViewNavbar? "navbar-collapse collapse in" : "navbar-collapse collapse"}>
                          <ul className="nav navbar-nav navbar-right">
                            { user && user.isLoggedIn ? <li><Link prefetch href="/portfolio/list"><a>Portfolio</a></Link></li> : <span /> }
                            { user && user.isLoggedIn ? <li><Link prefetch href="/account/profile"><a>Profile</a></Link></li> : <span /> }
                            { user && user.isAdmin ? <li><Link prefetch href="/admin/manage"><a>Manage</a></Link></li> : <span /> }
                            { user && user.isLoggedIn ? <li><a href="#" onClick={this.userLogout}>Logout</a></li> : <span /> }
                          </ul>
                        </div>
                        </nav>
                      {/*-- </div> --*/}
                  </div>
                </header>
        );
    }

    userLogout(evt){
        evt.preventDefault();
        this.props.userActions.userLogout();
    }
}

Navbar.propTypes = {
    userActions: PropTypes.object,
}

export default Navbar;
