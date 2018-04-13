import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    // commarize
} from '../../lib/helpers';

import TableStyle from '../styles/TableStyle';
import SortIcon from './SortIcon'

const PortfolioTable = ({portfolioList, onClick}) => (
    <div className="bounceInLeft animated">
        <div className="table-view table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col" rowSpan="2" className="th-icon">Icon</th>
                      <th scope="col" rowSpan="2" className="sortable">Coin Name <SortIcon /></th>
                      <th scope="col" rowSpan="2" className="sortable">Symbol <SortIcon /></th>
                      <th scope="col" rowSpan="2" className="sortable">Holdings <SortIcon /></th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Buy Price</th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Market Price</th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Valuation</th>
                      <th scope="col" colSpan="3">Profilt/Loss (%)</th>
                      <th scope="col" rowSpan="2" className="sortable">Allocation (%) <SortIcon /></th>
                    </tr>
                    <tr>
                        <th className="sortable">USD <SortIcon /></th>
                        <th className="sortable">BTC <SortIcon /></th>
                        <th className="sortable">ETH <SortIcon /></th>
                        <th className="sortable">USD <SortIcon /></th>
                        <th className="sortable">BTC <SortIcon /></th>
                        <th className="sortable">ETH <SortIcon /></th>
                        <th className="sortable">USD <SortIcon /></th>
                        <th className="sortable">BTC <SortIcon /></th>
                        <th className="sortable">ETH <SortIcon /></th>
                        <th className="sortable">USD <SortIcon /></th>
                        <th className="sortable">BTC <SortIcon /></th>
                        <th className="sortable">ETH <SortIcon /></th>
                    </tr>
                </thead>
                <tbody>
                    {portfolioList && portfolioList.allIds && portfolioList.allIds.map((id, key)=>(
                        id ?
                            <tr id="portfolio-tr" onClick={()=>{onClick(portfolioList.byId[id])}} key={key}>
                                {/* ------ Icon ------*/}
                                <td scope="col">
                                    <img src={`/static/icon/${portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id].symbol && portfolioList.byId[id].symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="25" width="25" />
                                </td>
                                {/* ------ Name ------*/}
                                <td scope="col">{portfolioList.byId[id]['name']}</td>
                                {/* ------ Symbol ------*/}
                                <td scope="col">{portfolioList.byId[id]['symbol']}</td>
                                {/* ------ Holdings/Amount ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{color: '#3F95EA'}}>
                                        {formatMoney(portfolioList.byId[id]['amount']) }
                                    </span>
                                </td>
                                {/* ------ Buy Price USD ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{color: '#3F95EA'}}>
                                        {portfolioList.byId[id]['buy_price_usd']}
                                    </span>
                                </td>
                                {/* ------ Buy Price BTC ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{color: '#3F95EA'}}>
                                        {portfolioList.byId[id]['buy_price_btc']}
                                    </span>
                                </td>
                                {/* ------ Buy Price ETH ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{color: '#3F95EA'}}>
                                        {portfolioList.byId[id]['buy_price_eth']}
                                    </span>
                                </td>
                                {/* ------ Market Price USD ------*/}
                                <td scope="col">
                                    <span className="num-span td-market-price">
                                        {formatMoney(portfolioList.byId[id]['price_usd']) }
                                    </span>
                                </td>
                                {/* ------ Market Price BTC ------*/}
                                <td scope="col">
                                    <span className="num-span td-market-price">
                                        {portfolioList.byId[id]['price_btc']}
                                    </span>
                                </td>
                                {/* ------ Market Price ETH ------*/}
                                <td scope="col">
                                    <span className="num-span td-market-price">
                                        {portfolioList.byId[id]['price_eth']}
                                    </span>
                                </td>
                                {/* ------ Valuation USD ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {/* {formatMoney(calculateValuation(portfolioList.byId[id], 'price_usd'), 2, 3, ',') } */}
                                        {formatMoney(calculateValuation(portfolioList.byId[id], 'price_usd')) }
                                    </span>
                                </td>
                                {/* ------ Valuation BTC ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {/* {formatMoney(calculateValuation(portfolioList.byId[id], 'price_btc'), 2, 3, ',') } */}
                                        {formatMoney(calculateValuation(portfolioList.byId[id], 'price_btc')) }
                                    </span>
                                </td>
                                {/* ------ Valuation ETH ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {/* {formatMoney(calculateValuation(portfolioList.byId[id], 'price_eth'), 2, 3, ',') } */}
                                        {formatMoney(calculateValuation(portfolioList.byId[id], 'price_eth')) }
                                    </span>
                                </td>
                                {/* ------ Profit/Lostt USD % ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{ color: isCalculateProfitOrLoss(portfolioList.byId[id], 'price_usd', 'buy_price_usd') ? 'green' : 'red' }}>
                                        {calculateProfitOrLoss(portfolioList.byId[id], 'price_usd', 'buy_price_usd')}
                                    </span>
                                </td>
                                {/* ------ Profit/Lostt BTC % ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{ color: isCalculateProfitOrLoss(portfolioList.byId[id], 'price_btc', 'buy_price_btc') ? 'green' : 'red' }}>
                                        {calculateProfitOrLoss(portfolioList.byId[id], 'price_btc', 'buy_price_btc')}
                                    </span>
                                </td>
                                {/* ------ Profit/Lostt ETH % ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{ color: isCalculateProfitOrLoss(portfolioList.byId[id], 'price_eth', 'buy_price_eth') ? 'green' : 'red' }}>
                                        {calculateProfitOrLoss(portfolioList.byId[id], 'price_eth', 'buy_price_eth')}
                                    </span>
                                </td>
                                {/* ------ Allocation % ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {calculatePercentage(portfolioList, id)}
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

PortfolioTable.propTypes = {
    portfolioList: PropTypes.object,
    onClick: PropTypes.func,
}

export default PortfolioTable;

// check if its a positive or negative
// function isPositiveNumber(numberString){
//     const number = parseFloat(numberString)
//     if(number>=0){
//         return true;
//     }
//     return false;
// }

/* ----------------------------------------------------------------------------------
 * Calculate allocation percentage by deviding coins valuation over the sum 
 * of total valuation the user on his/her portfolio
 * Formula: (Valuation/TotalValuation) * 100
 * -------------------------------------------------------------------------------- */
function calculatePercentage(portfolioList, id){
    let totalValuation = calculateTotalValuation(portfolioList) || 0;
    let currentValuation = calculateValuation(portfolioList.byId[id], 'price_usd') || 0;
    let currentPercentage = ( parseFloat(currentValuation)/parseFloat(totalValuation) ) * 100;

    return currentPercentage.toFixed(2);
}

/* ----------------------------------------------------------------------------------
 * Sum of all valutaion
 * Formulat: coin1Valuation + coin2Valuation ...
 * -------------------------------------------------------------------------------- */
function calculateTotalValuation(portfolioList){
    let totalValuation = 0;
    portfolioList && portfolioList.allIds && portfolioList.allIds.map((id)=>{
        if(id){
            totalValuation = totalValuation + calculateValuation(portfolioList.byId[id], 'price_usd')
        }
    })
    return totalValuation;
}

/* ----------------------------------------------------------------------------------
 * Sum up all valutaion per coin by multiplying the amount to market price
 * Formulat: amount * price_usd
 * -------------------------------------------------------------------------------- */
function calculateValuation(cryptoData, fieldName){
    const amount = parseFloat(cryptoData.amount) || 0;
    const market_price = parseFloat(cryptoData[fieldName]) || 0; 
    const valuation = amount * market_price;

    return valuation;
}


/* ----------------------------------------------------------------------------------
 * Calculate percentage whether its a profit or a loss
 * Formulat: (market_price - buy_price) / market_price
 * -------------------------------------------------------------------------------- */
function calculateProfitOrLoss(cryptoData, marketPriceFieldName, buyPriceFieldName){
    const market_price = parseFloat(cryptoData[marketPriceFieldName]) || 0;
    const buy_price = parseFloat(cryptoData[buyPriceFieldName]) || 0;
    const profitOrLoss = ((market_price - buy_price) / buy_price) * 100;

    if (profitOrLoss == Number.POSITIVE_INFINITY || profitOrLoss == Number.NEGATIVE_INFINITY){
        return "0.00";
    }

    if(profitOrLoss>=0){
        return `+${formatMoney(profitOrLoss)}`;
    }

    return profitOrLoss.toFixed(2);
}

/* ----------------------------------------------------------------------------------
 * check if its a positive or negative
 * this is mainly used only for adding "-" or "+" to a number
 * also used for coloring green for profit and red for loss
 * -------------------------------------------------------------------------------- */
function isCalculateProfitOrLoss(cryptoData, marketPriceFieldName, buyPriceFieldName){
    const market_price = parseFloat(cryptoData[marketPriceFieldName]) || 0;

    const buy_price = parseFloat(cryptoData[buyPriceFieldName]) || 0;
    const profitOrLoss = ((market_price - buy_price) / buy_price) * 100;

    if(profitOrLoss>=0){
        return true;
    }
    return false;
}
