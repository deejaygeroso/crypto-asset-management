import React from 'react';
import PropTypes from 'prop-types'

import {
    formatMoney,
    // commarize
} from '../../lib/helpers';


const Card = ({portfolio, cryptoData, onClick}) => (
    <div id="portfolio-card" onClick={()=>onClick(portfolio)} className="card d-flex flex-row flex-wrap align-content-center align-items-center justify-content-end">
        <div className="card-image " >
            <img src={`/static/icon/${portfolio && portfolio.symbol && portfolio.symbol.toLowerCase()}.png`} className="align-content-center" height="60" width="60" / >
        </div>
        <div className="d-flex flex-column flex-grow-1">
            <span className="portfolio-card-label">{portfolio.label}</span>
            <span className="portfolio-card-amount">Amount: {portfolio.amount}</span>
            <span className="portfolio-card-price">Buy/ICO Price: {cryptoData && cryptoData.buy_price}</span>
        </div>
        <div className="card-amount">
            $ {formatMoney(calculateValuation(cryptoData), 2, 3, ',')}
        </div>
        <CardStyles />
    </div>
)

Card.propTypes = {
    portfolio : PropTypes.object,
    cryptoData : PropTypes.object,
    onClick   : PropTypes.func,
}

export default Card;

const CardStyles = () => (
    <style jsx global>{`
            #portfolio-card{
                 cursor: pointer;
            }
            #portfolio-card:hover{
                box-shadow: 3px 3px 7px #888;
            }
            .card{
                margin: 10px;
                line-height: 1;
                box-shadow: 2px 2px 5px #888;
            }
            .card-image{
                padding: 12px;
            }
            .card-image > img {
                border-radius: 50%;
            }
            .card-amount{
                margin-right: 22px;
            }
            .portfolio-card-label{
                font-size: 25px;
                font-weight: 400;
            }
            .portfolio-card-amount{
                font-size: 14px;
                padding: 2px 0 2px 0px;
            }
            .portfolio-card-price{
                font-size: 14px;
            }
            @media (max-width: 400px) {
                .card-amount{
                    display: none;
                }
            }
  `}</style>
)

// function calculatePercentage(cryptoList, id){
//     let totalValuation = calculateTotalValuation(cryptoList)
//     let currentValuation = calculateValuation(cryptoList.byId[id])
//     let currentPercentage = ( parseFloat(currentValuation)/parseFloat(totalValuation) ) * 100;
//
//     return currentPercentage.toFixed(2);
// }

// function calculateTotalValuation(cryptoList){
//     let totalValuation = 0;
//     cryptoList && cryptoList.allIds && cryptoList.allIds.map((id)=>{
//         if(id){
//             totalValuation = totalValuation + calculateValuation(cryptoList && cryptoList.byId && cryptoList.byId[id])
//         }
//     })
//     return totalValuation;
// }

function calculateValuation(cryptoData){
    const amount = parseFloat(cryptoData && cryptoData.amount)
    const market_price = parseFloat(cryptoData && cryptoData.price_usd);
    const valuation = amount * market_price;

    return valuation;
}
