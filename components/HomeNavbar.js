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
                     <a className="navbar-brand" href="index.html">BlockPSV</a>
                    </div>
                    <div id="navbar" className={toggleMobileViewNavbar? "navbar-collapse collapse in" : "navbar-collapse collapse"}>
                      <ul className="nav navbar-nav navbar-right">
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link prefetch href="/login"><a>Login</a></Link></li>
                      </ul>
                    </div>
                </nav>
              {/* -- </div> --*/}
          </div>
    </header>
)

HomeNavbar.propTypes = {
    toggleMobileViewNavbar : PropTypes.bool,
    onToggle : PropTypes.func,
}

export default HomeNavbar;
