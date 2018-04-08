import React from 'react';
import PropTypes from 'prop-types';

import {
    // formatMoney,
    commarize
} from '../../lib/helpers';

import History from './History';
import CardStyle from '../styles/CardStyle';

const Card = ({portfolio, cryptoHistory, priceAth, priceAtl, volumeAth, volumeAtl, onClick}) => (
    <div className="card card-clickable" onClick={()=>{onClick(portfolio)}} >
        <div className="d-flex flex-row" >

            {/* ----------------------------- */}
            {/* ----------- Image ----------- */}
            {/* ----------------------------- */}
            <div className="card-image" >
                <img src={`/static/icon/${portfolio && portfolio.symbol && portfolio.symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="60" width="60" />
            </div>

            <div className="card-bit-header pl-3" >

               {/* ----------------------------- */}
               {/* ----------- Symbol ---------- */}
               {/* ----------------------------- */}
                <div className="d-flex flex-row">
                    <div className="" > <p className="crypto-name">{portfolio && portfolio.name }</p></div>
                    <div className="line-height-0-6">
                        <p className="font-size-15 line-height-0-6" >&nbsp;
                            ({ portfolio && portfolio.symbol })
                        </p>
                    </div>
                </div>

                { /* ----- 24h_volume_usd ----- */ }
                {/*
                <div className="card-24h-volume-usd line-height-0-6">
                    <p className="line-height-0-6" >
                        $ { portfolio && portfolio['24h_volume_usd'] ? formatMoney(portfolio['24h_volume_usd'], 0, 3, ',') : '' } USD 24h V
                    </p>
                </div>
                */}

               {/* ----------------------------- */}
               {/* ---------- Price USD -------- */}
               {/* ----------------------------- */}
                <div className="card-price-usd line-height-0-4" >
                    <p className="line-height-0-4 font-size-10" >
                        <span className="font-weight-100">
                            $ { numberWithCommas(portfolio && portfolio['price_usd']) } USD
                        </span>
                        <span style={{ color: checkIfIncreaseOrDecrease(portfolio, cryptoHistory, 'price_usd') ? 'green' : 'red' }}> &nbsp;
                            { cryptoHistory && Object.keys(cryptoHistory).length!==0 ? <span>({ getPercentage(portfolio, cryptoHistory, 'price_usd') })</span> : <span/> }
                        </span>
                    </p>
                </div>

               {/* ----------------------------- */}
               {/* ---------- ATH & ATL -------- */}
               {/* ----------------------------- */}
                {
                    cryptoHistory && Object.keys(cryptoHistory).length!==0 ? 
                    <div className="card-ath-atl line-height-0-4" >
                        <p className="line-height-0-4 font-size-10" >
                            <span className="card-ath">
                                $ {commarize(priceAth[portfolio && portfolio.id])} (ATH)
                            </span>
                            <span className="card-atl"> &nbsp;
                                $ {commarize(priceAtl[portfolio && portfolio.id])} (ATL)
                            </span>
                            <span>
                                &nbsp;
                            </span>
                        </p>
                    </div> : <div/>
                }

                {/*
                <div className="">
                    <div className="crypto-ath"></div>
                    <div className="crypto-atl">&nbsp;&nbsp;</div>
                    <div className="crypto-atl">$ {commarize(priceAtl[crypto && crypto.id])} (ATL)</div>
                </div>
                */}
            </div>




        </div> 

        <div className="d-flex flex-row align-items-center card-sub-info" >
               {/* ----------------------------- */}
               {/* ------------ RANK ----------- */}
               {/* ----------------------------- */}
                <div className="rank d-flex flex-grow-1 align-self-center justify-content-center align-items-center text-center" >
                    <div className="flex-column" >
                        <p className="text-center align-middle font-weight-600" > RANK </p> <br />
                        <p className="text-center align-middle" > No: { portfolio && portfolio.rank } </p>
                    </div>
                </div>

               {/* ----------------------------- */}
               {/* ------- Market Cap USD ------ */}
               {/* ----------------------------- */}
                <div className="d-flex flex-grow-1 align-self-center justify-content-center align-items-center text-center" >
                    <div className="flex-column">
                        <p className="text-center align-middl font-weight-600"> MARKET CAP </p> <br />
                        <p className="text-center align-middle">
                            $ { portfolio && portfolio['market_cap_usd'] ? commarize(portfolio.market_cap_usd) : '' }
                        </p>
                    </div>
                </div>

               {/* ----------------------------- */}
               {/* ------- 24h Volume USD ------ */}
               {/* ----------------------------- */}
                <div className="d-flex flex-grow-1 align-self-center justify-content-center align-items-center text-center" >
                    <div className="flex-column" style={{lineHeight: 0.8}}>
                        <p className="text-center align-middle font-weight-600">24h VOLUME</p>
                        <br/>
                        <p className="text-center align-middle">
                            $ { portfolio && portfolio['24h_volume_usd'] ? commarize(portfolio['24h_volume_usd']) : '' }
                            <span style={{color: checkIfIncreaseOrDecrease(portfolio, cryptoHistory, '24h_volume_usd') ? 'green' : 'red'}}>
                                &nbsp; ({ getPercentage(portfolio, cryptoHistory, '24h_volume_usd') })
                            </span>
                            <br/>
                            <span>
                                <span className="card-ath">$ {commarize(volumeAth[portfolio && portfolio.id])} (ATH)</span>
                                &nbsp;
                                &nbsp;
                                <span className="card-atl">$ {commarize(volumeAtl[portfolio && portfolio.id])} (ATL)</span>
                            </span>
                        </p>
                    </div>
                </div>
        </div>
        <History id = { portfolio && portfolio.id } cryptoHistory = { cryptoHistory } />
        <CardStyle />
    </div>
)

Card.propTypes = {
    portfolio:     PropTypes.object,
    cryptoHistory: PropTypes.object,
    priceAtl:      PropTypes.object,
    priceAth:      PropTypes.object,
    volumeAtl:     PropTypes.object,
    volumeAth:     PropTypes.object,
    onClick:     PropTypes.func,
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
