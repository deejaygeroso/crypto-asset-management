import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    // commarize
} from '../../lib/helpers';


const Header = ({isWelcome, cryptoGlobal}) => (
    <div className="gradient-header">
        {
            !isWelcome ?
                <div className="portfolio-header container">
                    <h1 className="gradient-header-title fadeInDown animated">
                        Welcome to BlockPSV!
                    </h1>
                    <p className="gradient-header-sub-title fadeIn animated">Here, we keep track of your cryptocurrencies 24/7.</p>
                </div>
            :
                <div className="global-data container d-flex flex-row flex-wrap justify-content-center align-content-center fadeInDown animated">
                    <div className="flex-grow-1 justify-content-center align-items-center">
                        <span>Cryptocurrencies : {cryptoGlobal && cryptoGlobal.total_crypto}</span>
                        &nbsp;/&nbsp;
                        <span>Markets: {cryptoGlobal && cryptoGlobal.active_markets}</span>
                    </div>
                    <div className="flex-grow-1 justify-content-center align-items-center">
                        <span>Market Cap: $ {formatMoney(cryptoGlobal && cryptoGlobal.total_market_cap_usd, 2, 3, ',')}</span>
                    </div>
                    <div className="flex-grow-1 justify-content-center align-items-center">
                        <span>24h Volume: $ {formatMoney(cryptoGlobal && cryptoGlobal.total_24h_volume_usd, 2, 3, ',')}</span>
                    </div>
                    <div className="flex-grow-1 justify-content-center align-items-center">
                        <span>BTC Dominance: {cryptoGlobal && cryptoGlobal.bitcoin_percentage_of_market_cap} %</span>
                    </div>
                </div>
        }
        <style jsx global>{`
            .gradient-header-title{
                color: #fff;
                text-align: center;
                padding: 0px;
                margin: 0px;
            }
            .gradient-header-sub-title{
                color: #fff;
                text-align: center;
            }
            .gradient-header{
                color: #fff;
            }
            .global-data{
                font-weight: 400;
                font-size: 16px;
                text-align: center;
            }
        `}</style>
    </div>
)

Header.propTypes = {
    isWelcome : PropTypes.bool,
    cryptoGlobal : PropTypes.object,
}

export default Header;
