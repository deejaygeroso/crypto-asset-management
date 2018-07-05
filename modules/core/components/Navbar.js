import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import moment from 'moment';

class Navbar extends Component{

    constructor(){
        super();
        this.state = {
            user: {},
            toggleMobileViewNavbar: false,
        }
        this.userLogout = this.userLogout.bind(this);
        this.getClassName = this.getClassName.bind(this);
        this.countDaysLeftFromNow = this.countDaysLeftFromNow.bind(this);
    }

    /* ----------------------------------------------------------------------------------
     * Get the currently logged in users information from the backend 
     * Note: must double check pages whether to remove userActions.itemFind()
     * Might delete setState({user}) here later. Need to double check this code.
     * -------------------------------------------------------------------------------- */
    componentDidMount(){
        const { userActions } = this.props;
        const userCookie = Cookies.get('user');

        // get the routename for admin so you won't fetch admin's user info when doing admin actions
        const routeNameSplit = Router.pathname.split('/')
        const routeName = routeNameSplit[1];

        // if user has no cookie redirect to login
        if(!userCookie){
            Router.push('/login');
        }else{
            const user = JSON.parse(userCookie.slice(2)); // remove j: from the string then convert to object

            // do not fetch user when an admin
            if(user && user._id && routeName!=='admin'){
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
     * Main Component. 
     * -------------------------------------------------------------------------------- */
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

    /* ----------------------------------------------------------------------------------
     * Count number of days from now from a given input date
     * -------------------------------------------------------------------------------- */
    countDaysLeftFromNow(date){
        var a = moment(date);
        var b = moment(new Date());
        var diffInDays = a.diff(b, 'days'); // 1 day
        return diffInDays;
    }

    /* ----------------------------------------------------------------------------------
     * This is for knowing which navigation link is currently active 
     * -------------------------------------------------------------------------------- */
    getClassName(routeName){
        const routeNameSplit = Router.pathname.split('/')
        if(routeNameSplit[1]===routeName){
            return "active-link";
        }
        return "";
    }

    /* ----------------------------------------------------------------------------------
     * when a users logout from the app 
     * -------------------------------------------------------------------------------- */
    userLogout(evt){
        evt.preventDefault();
        this.props.userActions.logout();
    }
}

Navbar.propTypes = {
    user: PropTypes.object,
    userActions: PropTypes.object,
}

export default Navbar;
