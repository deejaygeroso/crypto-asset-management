import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import HomeNavbar from './HomeNavbar';

class Home extends Component {

    constructor(){
        super();
        this.state = {
            toggleMobileViewNavbar : false,
        }
    }

    render(){
        const { toggleMobileViewNavbar } = this.state;
        return(
            <div>
                <HomeNavbar toggleMobileViewNavbar={toggleMobileViewNavbar} onToggle={()=>this.setState({toggleMobileViewNavbar: !toggleMobileViewNavbar})}/>

                    <section id="fh5co-home" data-section="home" data-stellar-background-ratio="0.5">
                        <div className="gradient"></div>
                        <div className="container">
                            <div className="text-wrap">
                                <div className="text-inner">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2">
                                            <h1 className="to-animate">Welcome to BlockPSV</h1>
                                            <h2 className="to-animate">“The swarm is headed towards us”</h2>
                                            <h2 className="to-animate">– Satoshi Nakamoto</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                <style jsx global>{`
                    #fh5co-home{
                        background-image: url(/static/images/full_image_2.jpg);
                    }
                `}</style>


            </div>
        )
    }
}

export default Home;
