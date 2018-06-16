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
     * Render Subscrbe button if tral/premium account is about to expire on 7 days 
     * -------------------------------------------------------------------------------- */
    renderSubscribeButton(){
        const { user } = this.props;
        const { router } = Router;

        const routeNameSplit = router && router.pathname && router.pathname.split('/')
        const routeName = routeNameSplit && routeNameSplit.length!==0 && routeNameSplit[1];
        // if user is Admin
        if( (user && user.isAdmin) || routeName==='admin'){
            return <div className="subscribe-hide"/> 
        }
        // if user account is trial
        if(user && user.isPremium===1){
            if(this.countDaysLeftFromNow(user.trialUntil)<7){
                return <Link prefetch href="/account/subscribe"><a className="subscribe" href="">Subscribe Now!</a></Link>
            }
        }
        // if user account is Premium
        if(user && user.isPremium===2){
            if(this.countDaysLeftFromNow(user.premiumUntil)<7){
                return <Link prefetch href="/account/subscribe"><a className="subscribe" href="">Renew Subscription</a></Link>
            }
        }
        return <div className="subscribe-hide"/> 
    }

    /* ----------------------------------------------------------------------------------
     * Render days left before expiration 
     * -------------------------------------------------------------------------------- */
    renderExpirationDaysLeft(){
        const { user } = this.props;
        const { router } = Router;

        const routeNameSplit = router && router.pathname && router.pathname.split('/')
        const routeName = routeNameSplit && routeNameSplit.length!==0 && routeNameSplit[1];
        // if user is Admin
        if( (user && user.isAdmin) || routeName==='admin'){
            return <div className="subscribe-hide"/> 
        }
        // if user account is trial
        if(user && user.isPremium===1){
            return <div className="days-left">Trial expires {moment(user.trialUntil).fromNow()}!</div>
        }
        // if user account is Premium
        if(user && user.isPremium===2){
            if(this.countDaysLeftFromNow(user.premiumUntil)<7){
               return <div className="days-left">Premium account expires {moment(user.premiumUntil).fromNow()}!</div>
            }
        }
        return <div className="subscribe-hide"/> 
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
                         {this.renderSubscribeButton()}
                         {this.renderExpirationDaysLeft()}
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
                        .subscribe-hide{
                            float: left;
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
