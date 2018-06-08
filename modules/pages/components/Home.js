import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import HomeNavbar from '../../core/components/HomeNavbar';
var Coinpayments = require('coinpayments');
var client = new Coinpayments({
    key: 'cc43cf1385d812a582569cdbc11d188cae7ba2eb999acd0a1597564b3d2be106',
    secret: 'a908f43c31F7bc07d03B50247399f9fbf48c6965068b88dD01374AE93f381b36',
    autoIpn: true,
}); 

let events = Coinpayments.events;
class Home extends Component {

    constructor(){
        super();
        this.state = {
            toggleMobileViewNavbar : false,
        }
    }

    componentDidMount() {
        // console.log('Coinpayments', client);
        console.log('ok', )
        // client.getBasicInfo((err, result)=>{
        //     console.log('data', result)
        // })
        // client.getProfile('orahkokos', function (err, response) {
        //     console.log(response)
        // })
        console.log('client', client)
        // client.createTransaction({'currency1' : 'BTC', 'currency2' : 'BTC', 'amount' : 10},function(err,result){
        //     console.log('err', err)
        //     console.log('result', result);
        //   });

        // CPCF4ASJXLNOPDHN1PMOZX8QFI
        client.getTx('CPCF76D69M2XZ1Z91FEEJCMPDI', function(err,result){
            console.log('err txn', err)
            console.log('result txn',result);
          }); 

        // client.rates(function(err,result){
        //     console.log('rates', result);
        //   });
        // client.convertCoins({
        //     amount: 0.1,
        //     from: "BTC",
        //     to: "ETH"
        //   }, function (err, response) {
        //       console.log('err', err)
        //     console.log(response)
        //   })

        // client.on('autoipn', function(data){
        //     // Handle data
        //     // data = getTxMulti
        //     console.log('ok', )
        //     console.log('data', data)
        // }); 

        console.log('ipn', event)

        // client.getDepositAddress("BTC", function (err, response) {
        //     console.log('err da', err)
        //     console.log('da', response)
        //   })

        events.on('ipn_pending', function(data){
            // Handle pending payment
            console.log("IPN PENDING");
            console.log(data);
        });

        // console.log('loist', )
        // client.getTxList(function (err, response) {
        //     console.log('err list', err)
        //     console.log('response list', response)
        //   })

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
                                            <form action="https://www.coinpayments.net/index.php" method="post">
                                                <input type="hidden" name="cmd" value="_pay_simple" />
                                                <input type="hidden" name="reset" value="1" />
                                                <input type="hidden" name="merchant" value="7a90840dd24a1735ab0a1dbdc2d2d26e" />
                                                <input type="hidden" name="item_name" value="premium" />
                                                <input type="hidden" name="currency" value="USD" />
                                                <input type="hidden" name="success_url" value="http://localhost:3000/" />
                                                <input type="hidden" name="amountf" value="10.00000000" />
                                                <input type="hidden" name="want_shipping" value="0" />
                                                <input type="hidden" name="first_name" value="deejay" />
                                                {/* <input type="image" src="https://www.coinpayments.net/images/pub/buynow-wide-yellow.png" alt="Buy Now with CoinPayments.net" /> */}
                                                <input type="submit" value="Premium"/>
                                            </form>

                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="container text-center mt-80">
                        <div className="row">
                            <div className="col-md-12 mb-40">
                                <h1 className="mb-0">Features</h1>
                                <p>Our Main Features Includes the following</p>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <a href="#profit-margin" className="feature-wrap">
                                    <div className="feature">
                                        <i className="fas fa-lg fa-chart-line"></i> 
                                        <h1>Profit Margin</h1>
                                        <p>Your gains and losses at all entry points.</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <a href="#other-statistics" className="feature-wrap"> 
                                    <div className="feature">
                                        <i className="fas fa-lg fa-chart-area"></i>
                                        <h1>Other Statistics</h1>
                                        <p>In-depth coin statistics you need.</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <a href="#volume-overview" className="feature-wrap"> 
                                    <div className="feature">
                                        <i className="fas fa-lg fa-chart-pie"></i>
                                        <h1>Volume Overview</h1>
                                        <p>Updated volume trends and history.</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="container text-center mt-60">
                            <div className="row">
                                <div id="profit-margin" className="col-md-12 mt-30">
                                    <h1 className="mb-10">Profit Margin</h1>
                                    <p>BlockPSV allows you to track your gains and/or losses by inputting your buy price. It will automatically calculate your profit margin by comparing the current market price against your purchase price. You will also be able to see your valuation for each coin based on the amount of your holdings. All values are available in USD, BTC and ETH.</p>
                                </div>
                                <div id="other-statistics" className="col-md-12 mt-30">
                                    <h1 className="mb-10">Other Statistics</h1>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                                <div id="volume-overview" className="col-md-12 mt-30">
                                    <h1 className="mb-10">Volume Overview</h1>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer text-center">
                        BlockPSV © 2018
                    </div>
                <style jsx global>{`
                    #fh5co-home{
                        background-image: url(/static/images/full_image_2.jpg);
                        height: 100vh;
                    }
                    .feature-wrap{
                        text-decoration: none !important;
                    }
                    .feature{
                        box-shadow: 2px 2px 5px #888;
                        padding: 20px;
                        border-raduis: 20px !important;
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
                    }
                    .feature > i{
                        font-size: 28px;
                        padding: 27px 24px;
                        background-color: #57c9a7;
                        border-radius: 52px;
                        margin: 20px;
                        color: #fff;
                    }
                    .footer{
                        background-color: #52bfa9;
                        color: #fff;
                        font-size: 18px;
                        padding: 20px;
                    }
                `}</style>


            </div>
        )
    }
}

export default Home;
