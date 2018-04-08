import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    commarize
} from '../../lib/helpers';

import TableStyle from '../styles/TableStyle';

const StatsTable = ({portfolioList, onClick}) => (
    <div className="bounceInRight animated">
        <div className="table-view table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col" rowSpan="2" className="table-th-rowspan th-icon">Icon</th>
                      <th scope="col" rowSpan="2" className="table-th-rowspan">Coin Name</th>
                      <th scope="col" rowSpan="2" className="table-th-rowspan">Symbol</th>
                      <th scope="col" rowSpan="2" className="table-th-rowspan nobr">Market Price (USD)</th>
                      <th scope="col" colSpan="3" className="table-th-colspan">% Change</th>
                      <th scope="col" rowSpan="2" className="table-th-rowspan nobr">Market Cap (USD)</th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Supply</th>
                    </tr>
                    <tr>
                        <th>1h</th>
                        <th>24h</th>
                        <th>7d</th>
                        <th>Circulating</th>
                        <th>Maximum</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    {portfolioList && portfolioList.allIds && portfolioList.allIds.map((id, key)=>(
                        id ?
                            <tr id="portfolio-tr" onClick={()=>{onClick(portfolioList.byId[id])}} key={key}>
                                { /* ------- Icon ------ */ }
                                <td scope="col">
                                    <img src={`/static/icon/${portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id].symbol && portfolioList.byId[id].symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="25" width="25" />
                                </td>
                                { /* ------- Name ------ */ }
                                <td scope="col">{portfolioList.byId[id]['name']}</td>
                                { /* ------- Symbol ------ */ }
                                <td scope="col">{portfolioList.byId[id]['symbol']}</td>
                                { /* ------- Market Price / Buy Price USD ------ */ }
                                <td scope="col">
                                        <span className="num-span">
                                            {formatMoney(portfolioList.byId[id]['price_usd']) }
                                        </span>
                                </td>
                                { /* ------- 1h % Change ------ */ }
                                <td scope="col">
                                    <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_1h'] && portfolioList.byId[id]['percent_change_1h'].charAt(0)!=='-' ? 'green' : 'red' }}>
                                        {portfolioList.byId[id]['percent_change_1h']}
                                    </span>
                                </td>
                                { /* ------- 24h % Change ------ */ }
                                <td scope="col">
                                    <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_24h'] && portfolioList.byId[id]['percent_change_24h'].charAt(0)!=='-' ? 'green' : 'red' }}>
                                        {portfolioList.byId[id]['percent_change_24h']}
                                    </span>
                                </td>
                                { /* ------- 7d % Change ------ */ }
                                <td scope="col">
                                    <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_7d'] && portfolioList.byId[id]['percent_change_7d'].charAt(0)!=='-' ? 'green' : 'red' }}>
                                        {portfolioList.byId[id]['percent_change_7d']}
                                    </span>
                                </td>
                                { /* ------- Market Cap (USD) ------ */ }
                                <td scope="col">
                                    <span className="num-span">
                                        {commarize(portfolioList.byId[id]['market_cap_usd'])}
                                    </span>
                                </td>
                                { /* ------- Circulating/Available Supply ------ */ }
                                <td scope="col">
                                    <span className="num-span">
                                        {commarize(portfolioList.byId[id]['available_supply'])}
                                    </span>
                                </td>
                                { /* ------- Maximum Supply ------ */ }
                                <td scope="col">
                                    <span className="num-span">
                                        {portfolioList.byId[id]['max_supply'] ? commarize(portfolioList.byId[id]['max_supply']) : "N/A"}
                                    </span>
                                </td>
                                { /* ------- Total Supply ------ */ }
                                <td scope="col">
                                    <span className="num-span">
                                        {commarize(portfolioList.byId[id]['total_supply'])}
                                    </span>
                                </td>
                            </tr>
                        :
                            <tr key={key}>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                                <td scope="col"></td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/*
            <div className="btn-wrapper">
                <button onClick={()=>onClick({})} className="btn btn-lg btn-primary btn-block" type="submit">
                    Add Coin
                </button>
            </div>
        */}
        <TableStyle />
    </div>
)

StatsTable.propTypes = {
    portfolioList: PropTypes.object,
    onClick: PropTypes.func,
}

export default StatsTable;

// check if its a positive or negative
// function isPositiveNumber(numberString){
//     const number = parseFloat(numberString)
//     if(number>=0){
//         return true;
//     }
//     return false;
// }

// function calculatePercentage(portfolioList, id){
//     let totalValuation = calculateTotalValuation(portfolioList)
//     let currentValuation = calculateValuation(portfolioList.byId[id])
//     let currentPercentage = ( parseFloat(currentValuation)/parseFloat(totalValuation) ) * 100;

//     return currentPercentage.toFixed(2);
// }

// function calculateTotalValuation(portfolioList){
//     let totalValuation = 0;
//     portfolioList && portfolioList.allIds && portfolioList.allIds.map((id)=>{
//         if(id){
//             totalValuation = totalValuation + calculateValuation(portfolioList.byId[id])
//         }
//     })
//     return totalValuation;
// }

// function calculateValuation(cryptoData){
//     const amount = parseFloat(cryptoData.amount)
//     const market_price = parseFloat(cryptoData.price_usd);
//     const valuation = amount * market_price;

//     return valuation;
// }


// function calculateProfitOrLoss(cryptoData){
//     const market_price = parseFloat(cryptoData.price_usd);
//     const buy_price = parseFloat(cryptoData.buy_price);
//     const profitOrLoss = (market_price - buy_price) / market_price;

//     if(profitOrLoss>=0){
//         return `+${profitOrLoss.toFixed(2)}`;
//     }

//     return profitOrLoss.toFixed(2);
// }

// check if its a positive or negative
// function isCalculateProfitOrLoss(cryptoData){
//     const market_price = parseFloat(cryptoData.price_usd);
//     const buy_price = parseFloat(cryptoData.buy_price);
//     const profitOrLoss = (market_price - buy_price) / market_price;

//     if(profitOrLoss>=0){
//         return true;
//     }
//     return false;
// }
