import React, { Component } from 'react';
import Link from 'next/link';
// import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';
import HomeNavbar from '../../core/components/HomeNavbar';

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
                                            <img src="/static/images/logo.png" className="logo align-content-center" height="320" width="320" />
                                            <h1 className="to-animate">Welcome to BlockPSV</h1>
                                            <h2 className="to-animate">“The Swiss Army Knife of Crypto Asset Management”</h2>
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="feature-images text-center pt-80 mt-90 mb-90">
                        <div className="row">
                            <div className="col-md-12 mt-90">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h1 className="mb-0">Profit Margin</h1>
                                    <p>Your gains and losses at all entry points.</p>
                                    <center><img src="/static/images/profitmargin.png" className="align-content-center img-responsive" width="1050" /></center>
                                </ScrollAnimation>
                            </div>
                            <div className="col-md-12 mt-90">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h1 className="mb-0">Other Stats</h1>
                                    <p>In-depth coin statistics you need.</p>
                                    <center><img src="/static/images/otherstats.png" className="align-content-center img-responsive" width="1050" /></center>
                                </ScrollAnimation>
                            </div>
                            <div className="col-md-12 mt-90">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h1 className="mb-0">Volume Overview</h1>
                                    <p>Updated volume trends and history.</p>
                                    <center><img src="/static/images/volumeoverview.png" className="align-content-center img-responsive" width="1050" /></center>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </section>

                    <section className="feature-container feature-definition text-center">
                        <div className="container">
                            <ScrollAnimation animateIn="fadeIn">
                                <div className="row">
                                    <div id="profit-margin" className="feature-description col-md-12">
                                        <h1 className="mb-10">Profit Margin</h1>
                                        <p>Portfolio Management on BlockPSV platform allows you to track your gains and losses in real-time. <br/>Unlike any other portfolio tracker, BlockPSV compares the current market price with your buy price in USD, BTC and ETH values.</p>
                                    </div>
                                    <div id="other-statistics" className="feature-description col-md-12">
                                        <h1 className="mb-10">Other Statistics</h1>
                                        <p>Statistics such as market capitalization, price percent-change and supply are relevant indicators in price analysis.<br/>They are part of the building blocks in the decision making process.</p>
                                    </div>
                                    <div id="volume-overview" className="feature-description col-md-12">
                                        <h1 className="mb-10">Volume Overview</h1>
                                        <p>Trend is a defining factor. However, zooming in from the big picture, a well timed position entry or exit uses volume as the lead indicator.</p>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </section>
                    <section className="feature-signup container text-center">
                        <div className="row">
                            <ScrollAnimation animateIn="fadeIn">
                                <h1>Manage Your Portfolio The Right Way</h1>
                                <Link prefetch href="/signup"><a className="start-now">START NOW</a></Link>
                            </ScrollAnimation>
                        </div>
                    </section>
                    <div className="footer text-center">
                        BlockPSV © 2018
                    </div>
                <style jsx global>{`
                    #fh5co-home{
                        background-image: url(/static/images/full_image_2.jpg);
                        height: 100vh;
                    }
                    .feature-container{
                        padding-right: 50px;
                        padding-left: 50px;
                        padding-top: 90px;
                        height: 100vh;
                        border-bottom: 1px solid #e6e3e3;
                    }
                    .feature-definition{
                        background-image: url(/static/images/features.jpeg);
                        background-size: cover;
                    }
                    .feature-definition > div{
                        background: #f1f1f1e0;
                        border-radius: 10px;
                        padding: 20px 90px;
                    }
                    .feature-wrap{
                        text-decoration: none !important;
                    }
                    .feature{
                        box-shadow: 2px 2px 5px #888;
                        border-raduis: 20px !important;
                        height: 30vh;
                        padding-top: 40px;
                    }
                    .feature:hover{
                        box-shadow: 3px 3px 13px #888;
                    }
                    .feature > h1{
                        font-size: 22px;
                        margin: 0px;
                    }
                    .feature > p{
                        margin: 0px;
                        font-size: 16px;
                        color: #7a7070;
                    }
                    .feature > i{
                        font-size: 28px;
                        padding: 27px 24px;
                        background-color: #57c9a7;
                        border-radius: 52px;
                        margin: 20px;
                        color: #fff;
                    }
                    .feature-description{
                        padding: 17px 0;
                    }
                    .feature-signup{
                        margin-top: 130px;
                        margin-bottom: 130px;
                    }
                    .start-now{
                        background: #3f95ea;
                        padding: 20px 140px;
                        border-radius: 34px;
                        color: #fff;
                        text-decoration: none !important;
                        cursor: pointer;
                    }
                    .start-now:hover{
                        background: #1d78d2;
                        color: #fff;
                    }
                    .footer{
                        background-color: #52bfa9;
                        color: #fff;
                        font-size: 18px;
                        padding: 20px;
                    }
                    @media only screen and (max-width: 1200px) {
                        .feature-container{
                            height: 800px;
                        }
                      }
                    @media only screen and (max-width: 850px) {
                        .feature-container{
                            padding-right: 10px;
                            padding-left: 10px;
                            padding-top: 10px;
                            height: 800px;
                        }
                      }
                    @media only screen and (max-width: 590px) {
                        .feature-container{
                            padding-right: 10px;
                            padding-left: 10px;
                            padding-top: 20px;
                        }
                        .feature-container > div{
                            padding: 10px 20px;
                        }
                      }
                      @media only screen and (max-width: 450px) {
                        .logo{
                            height: 190px;
                            width: 190px;
                        }
                        .feature-container{
                            height: 900px;
                        }
                        .feature-container > div{
                            padding: 10px 20px;
                        }
                        .feature-images > div > div{
                            padding-left: 0px;
                            padding-right: 0px;
                        }
                        .feature-images > div {
                            margin-left: 0px;
                            margin-right: 0px;
                        }
                      }
                `}</style>


            </div>
        )
    }
}

export default Home;
