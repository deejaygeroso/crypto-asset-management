import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import HomeNavbar from '../../core/components/HomeNavbar';

class About extends Component {

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
                                        <div className="about-us-content">

                                        <h1 className="to-animate about-us-title">About BlockPSV</h1>

                                        <p>BlockPSV is an online cryptocurrency portfolio manager. It is user-friendly tool to keep track of all of your cryptocurrency investments.</p> 

                                        <p>The platform allows you to have an overview of your cryptocurrency investments and find detailed information on each coin such as price, volume, market capital and other market stats.</p>

                                        <p>The following are the special features that separate BlockPSV from other online cryptocurrency portfolio manager:</p>

                                        <div className="about-us-info">
                                            <h3>Profit Margin </h3>
                                                <p>It calculates your profit margin by comparing the current market price with your input buy price whether in USD, BTC and/or ETH.</p>
                                                
                                            <h3>Price Historical Data</h3>
                                                <p>It provides a 7-day price history which would provide you an overview of the one week performance of the coin.</p>
                                                <p>It also provides 1h, 24h and 7d percent change in price for each coin.</p>
                                                
                                            <h3>Volume Historical Data</h3>
                                                <p>It provides a 7-day historical data for volume which is very helpful in finding short or long opportunities.</p>
                                                <p>It also provides a 24h all-time-high (ATH) and all-time-low (ATL) data for volume.</p>
                                                
                                            <h3>Market Overview</h3>
                                                <p>Monitor the over-all market capitalization and 24h volume, and Bitcoin dominace right from your portfolio.</p>
                                                
                                            <h3>Over 1,500 Cryptocurrencies</h3>
                                                <p>It covers almost all cryptocurrencies available in the market.</p>
                                                
                                            <h3>User Friendly</h3>
                                                <p>It offers an easy-to-use interface especially for beginners in cryptocurrency trading.</p>
                                                
                                            <h3>Visual Options</h3>
                                                <p>The platform provides table views and widgets view of your portfolio.</p>

                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </section>

                <style jsx global>{`
                    #fh5co-home{
                        background-image: url(/static/images/full_image_2.jpg);
                        height: 100vh;
                    }
                    .about-us-title{
                        color: #fcff22 !important;
                    }
                    .about-us-content{
                        line-height: 2;
                        margin-top: 150px;
                    }
                    h3{
                        margin-bottom: 2px;
                        margin-top: 18px;
                        color: #fcff22;
                    }
                    .about-us-info{
                        text-align: center;
                    }
                    .about-us-info > p{
                        margin-left: 50px;
                        margin-bottom: 0px;
                    }
                `}</style>


            </div>
        )
    }
}

export default About;
