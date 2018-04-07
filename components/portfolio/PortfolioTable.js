import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    // commarize
} from '../../lib/helpers';


const TableView = ({portfolioList, onClick}) => (
    <div className="bounceInRight animated">
        <div className="table-view table-responsive bounceInRight animated">

            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col" rowSpan="2">Icon</th>
                      <th scope="col" rowSpan="2">Coin Name</th>
                      <th scope="col" rowSpan="2">Symbol</th>
                      <th scope="col" rowSpan="2">Holdings</th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Buy Price</th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Market Price</th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Valuation</th>
                      <th scope="col" rowSpan="2">Profilt/Loss(%)</th>
                      <th scope="col" rowSpan="2">Allocation (%)</th>
                    </tr>
                    <tr>
                        <th>USD</th>
                        <th>BTC</th>
                        <th>ETH</th>
                        <th>USD</th>
                        <th>BTC</th>
                        <th>ETH</th>
                        <th>USD</th>
                        <th>BTC</th>
                        <th>ETH</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolioList && portfolioList.allIds && portfolioList.allIds.map((id, key)=>(
                        id ?
                            <tr id="portfolio-tr" onClick={()=>{onClick(portfolioList.byId[id])}} key={key}>
                                {/* ------ Icon ------*/}
                                <td scope="col">
                                    <img src={`/static/icon/${portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id].symbol && portfolioList.byId[id].symbol.toLowerCase()}.png`} className="align-content-center" height="25" width="25" / >
                                </td>
                                {/* ------ Name ------*/}
                                <td scope="col">{portfolioList.byId[id]['name']}</td>
                                {/* ------ Symbol ------*/}
                                <td scope="col">{portfolioList.byId[id]['symbol']}</td>
                                {/* ------ Holdings/Amount ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{color: '#3F95EA'}}>
                                        {formatMoney(portfolioList.byId[id]['amount'], 2, 3, ',') }
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
                                    <span className="num-span">
                                        {formatMoney(portfolioList.byId[id]['price_usd'], 2, 3, ',') }
                                    </span>
                                </td>
                                {/* ------ Market Price BTC ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {portfolioList.byId[id]['price_btc']}
                                    </span>
                                </td>
                                {/* ------ Market Price ETH ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {portfolioList.byId[id]['price_eth']}
                                    </span>
                                </td>
                                {/* ------ Valuation USD ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {formatMoney(calculateValuation(portfolioList.byId[id], 'price_usd'), 2, 3, ',') }
                                    </span>
                                </td>
                                {/* ------ Valuation BTC ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {formatMoney(calculateValuation(portfolioList.byId[id], 'price_btc'), 2, 3, ',') }
                                    </span>
                                </td>
                                {/* ------ Valuation ETH ------*/}
                                <td scope="col">
                                    <span className="num-span">
                                        {formatMoney(calculateValuation(portfolioList.byId[id], 'price_eth'), 2, 3, ',') }
                                    </span>
                                </td>
                                {/* ------ Profit/Lostt % ------*/}
                                <td scope="col">
                                    <span className="num-span" style={{ color: isCalculateProfitOrLoss(portfolioList.byId[id]) ? 'green' : 'red' }}>
                                        {calculateProfitOrLoss(portfolioList.byId[id])}
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span">
                                        xx
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
        <style jsx global>{`
            #portfolio-tr{
                cursor: pointer;
            }
            .table-view{
                margin: 15px 0px;
                border-radius: 10px
            }
            .table{
                font-size: 13px;
            }
        `}</style>
    </div>
)

TableView.propTypes = {
    portfolioList: PropTypes.object,
    onClick: PropTypes.func,
}

export default TableView;

// check if its a positive or negative
function isPositiveNumber(numberString){
    const number = parseFloat(numberString)
    if(number>=0){
        return true;
    }
    return false;
}

function calculatePercentage(portfolioList, id){
    let totalValuation = calculateTotalValuation(portfolioList)
    let currentValuation = calculateValuation(portfolioList.byId[id])
    let currentPercentage = ( parseFloat(currentValuation)/parseFloat(totalValuation) ) * 100;

    return currentPercentage.toFixed(2);
}

function calculateTotalValuation(portfolioList){
    let totalValuation = 0;
    portfolioList && portfolioList.allIds && portfolioList.allIds.map((id)=>{
        if(id){
            totalValuation = totalValuation + calculateValuation(portfolioList.byId[id])
        }
    })
    return totalValuation;
}

function calculateValuation(cryptoData, fieldName){
    const amount = parseFloat(cryptoData.amount)
    const market_price = parseFloat(cryptoData[fieldName]);
    const valuation = amount * market_price;

    return valuation;
}


function calculateProfitOrLoss(cryptoData){
    const market_price = parseFloat(cryptoData.price_usd);
    const buy_price = parseFloat(cryptoData.buy_price_usd);
    const profitOrLoss = (market_price - buy_price) / market_price;

    if(profitOrLoss>=0){
        return `+${profitOrLoss.toFixed(2)}`;
    }

    return profitOrLoss.toFixed(2);
}

// check if its a positive or negative
function isCalculateProfitOrLoss(cryptoData){
    const market_price = parseFloat(cryptoData.price_usd);
    const buy_price = parseFloat(cryptoData.buy_price_usd);
    const profitOrLoss = (market_price - buy_price) / market_price;

    if(profitOrLoss>=0){
        return true;
    }
    return false;
}
