import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

const HomeNavbar = ({toggleMobileViewNavbar, onToggle}) => (
    <header role="banner" id="fh5co-header">
            <div className="container">
                {/* -- <div className="row"> --*/}
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        {/* -- Mobile Toggle Menu Button --*/}
                        <a href="#" onClick={onToggle} className="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                     <Link prefetch href="/"><a className="navbar-brand">BlockPSV</a></Link>
                    </div>
                    <div id="navbar" className={toggleMobileViewNavbar? "navbar-collapse collapse in" : "navbar-collapse collapse"}>
                      <ul className="nav navbar-nav navbar-right">
                        <li><Link prefetch href="/"><a>Home</a></Link></li>
                        {/* <li><Link prefetch href="/about"><a>About</a></Link></li> */}
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/wiki">Wiki</a></li>
                        <li><Link prefetch href="/signup"><a href="/signup">Sign up</a></Link></li>
                        <li><Link prefetch href="/login"><a href="/signup">Login</a></Link></li>
                        {/* <li><Link prefetch href="/login"><a><i className="login-button fas fa-user-circle"></i></a></Link></li> */}
                      </ul>
                    </div>
                </nav>
                {/* -- </div> --*/}
            </div>

            <style jsx global>{`
                .login-button{
                    font-size: 33px;
                }
            `}</style>
    </header>
)

HomeNavbar.propTypes = {
    toggleMobileViewNavbar : PropTypes.bool,
    onToggle : PropTypes.func,
}

export default HomeNavbar;
