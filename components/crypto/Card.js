import React from 'react';
import PropTypes from 'prop-types';

import {
    // formatMoney,
    commarize
} from '../../lib/helpers';

import History from './History';
import CardStyle from './CardStyle';

const Card = ({ crypto, cryptoHistory, cryptoAth, cryptoAtl }) => (
    <div>
        <div className="card d-flex flex-column align-content-around justify-content-center "  style={{display: 'inline-flex'}}>

            <div className="d-flex flex-row flex-nowrap pl-2 pr-2 mt-2" >


                { /* ----- image ----- */ }
                <div className="card-image d-flex align-items-center justify-content-center" >
                    <img src={`/static/icon/${crypto && crypto.symbol && crypto.symbol.toLowerCase()}.png`} className="align-content-center" height="60" width="60" / >
                </div>

                <div className="card-bit-header pl-3" >

                    { /* ----- name with symbol ----- */ }
                    <div className="d-flex flex-row">
                        <div className="" > <p className="crypto-name">{crypto && crypto.name }</p></div>
                        <div className="line-height-0-6">
                            <p className="font-size-15 line-height-0-6" >&nbsp;
                                ({ crypto && crypto.symbol })
                            </p>
                        </div>
                    </div>

                    { /* ----- 24h_volume_usd ----- */ }
                    {/*
                        <div className="card-24h-volume-usd line-height-0-6">
                            <p className="line-height-0-6" >
                                $ { crypto && crypto['24h_volume_usd'] ? formatMoney(crypto['24h_volume_usd'], 0, 3, ',') : '' } USD 24h V
                            </p>
                        </div>
                    */}

                    { /* ----- price_usd ----- */ }
                    <div className="card-price-usd line-height-0-4" >
                        <p className="line-height-0-4 font-size-10" >
                            <span className="font-weight-600">
                                $ { numberWithCommas(crypto && crypto['price_usd']) } USD
                            </span>
                            <span style={{ color: checkIfIncreaseOrDecrease(crypto, cryptoHistory, 'price_usd') ? 'green' : 'red' }}> &nbsp;
                                ({ getPercentage(crypto, cryptoHistory, 'price_usd') })
                            </span>
                        </p>
                    </div>

                    { /* ----- ath & atl ----- */ }
                    <div className="card-ath-atl line-height-0-4" >
                        <p className="line-height-0-4 font-size-10" >
                            <span className="card-ath">
                                $ {commarize(cryptoAth[crypto && crypto.id])} (ATH)
                            </span>
                            <span className="card-atl"> &nbsp;
                                $ {commarize(cryptoAtl[crypto && crypto.id])} (ATL)
                            </span>
                            <span>
                                &nbsp;– 24h V
                            </span>
                        </p>
                    </div>

                    {/*
                    <div className="">
                        <div className="crypto-ath"></div>
                        <div className="crypto-atl">&nbsp;&nbsp;</div>
                        <div className="crypto-atl">$ {commarize(cryptoAtl[crypto && crypto.id])} (ATL)</div>
                    </div>
                    */}

                </div>

            </div>


            <div className="d-flex flex-row align-items-center card-sub-info" >
                { /* ----- rank ----- */ }
                <div className="rank d-flex flex-grow-1 align-self-center justify-content-center align-items-center text-center" >
                    <div className="flex-column" >
                        <p className="text-center align-middle font-weight-600" > RANK </p> <br / >
                        <p className="text-center align-middle" > No: { crypto && crypto.rank } </p>
                    </div>
                </div>

                { /* ----- market_cap_usd ----- */ }
                <div className="d-flex flex-grow-1 align-self-center justify-content-center align-items-center text-center" >
                    <div className="flex-column">
                        <p className="text-center align-middl font-weight-600"> MARKET CAP </p> <br />
                        <p className="text-center align-middle">
                            $ { crypto && crypto['market_cap_usd'] ? commarize(crypto.market_cap_usd) : '' }
                        </p>
                    </div>
                </div>

                { /* ----- 24h_volume_usd ----- */ }
                <div className="d-flex flex-grow-1 align-self-center justify-content-center align-items-center text-center" >
                    <div className="flex-column" >
                        <p className="text-center align-middle font-weight-600">24h VOLUME</p>
                        <br/ >
                        <p className="text-center align-middle">
                            $ { crypto && crypto['24h_volume_usd'] ? commarize(crypto['24h_volume_usd']) : '' }
                            <span style={{color: checkIfIncreaseOrDecrease(crypto, cryptoHistory, '24h_volume_usd') ? 'green' : 'red'}}>
                                &nbsp; ({ getPercentage(crypto, cryptoHistory, '24h_volume_usd') })
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <History id = { crypto && crypto.id } cryptoHistory = { cryptoHistory } />
            <CardStyle / >

        </div>
</div>
)

Card.propTypes = {
    crypto : PropTypes.object,
    cryptoHistory : PropTypes.object,
    cryptoAtl : PropTypes.object,
    cryptoAth : PropTypes.object,
}

export default Card;


const numberWithCommas = (input) => {
    const value = parseFloat(input)
    var parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


function checkIfIncreaseOrDecrease(crypto, cryptoHistory, field) {

    const newAmount = parseFloat(crypto && crypto[field]);
    const originalAmount = parseFloat(cryptoHistory && cryptoHistory[crypto && crypto.id] && cryptoHistory[crypto && crypto.id][0] && cryptoHistory[crypto && crypto.id][0][field]);
    if (newAmount >= originalAmount) {
        return true
    } else {
        return false;
    }
}

// need to double check again the inside values
function getPercentage(crypto, cryptoHistory, field) {
    const newAmount = parseFloat(crypto && crypto[field]);
    const originalAmount = parseFloat(cryptoHistory && cryptoHistory[crypto && crypto.id] && cryptoHistory[crypto && crypto.id][0] && cryptoHistory[crypto && crypto.id][0][field]);
    let percentage = 0;

    if (newAmount === 0 && originalAmount === 0) {
        return 0;
    }

    if (newAmount >= originalAmount) {
        percentage = percentageIncrease(originalAmount, newAmount);
    } else {
        percentage = percentageDecrease(originalAmount, newAmount);
    }
    return percentage;
}

function percentageIncrease(originalAmount, newAmount) {
    const increase = newAmount - originalAmount;
    const percentageIncrease = (increase / originalAmount) * 100;
    return `+${percentageIncrease.toFixed(2)}%`;
}

function percentageDecrease(originalAmount, newAmount) {
    const decrease = originalAmount - newAmount;
    const percentageDecrease = (decrease / originalAmount) * 100;
    return `-${percentageDecrease.toFixed(2)}%`;
}
