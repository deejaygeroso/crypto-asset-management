import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    // commarize
} from '../../lib/helpers';


const TableView = ({cryptoList, onClick}) => (
    <div className="bounceInRight animated">
        <div className="table-view table-responsive bounceInRight animated">

            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Icon</th>
                      <th scope="col">Coin Name</th>
                      <th scope="col">Symbol</th>
                      <th scope="col">Holdings</th>
                      <th scope="col">Buy/ICO Price ($)</th>
                      <th scope="col">Market Price ($)</th>
                      <th scope="col">Valuation ($)</th>
                      <th scope="col">(%)</th>
                      <th scope="col">Profilt/Loss(%)</th>
                      <th scope="col">% Change (24h)</th>
                      <th scope="col">% Change (7d)</th>
                      <th scope="col">Volume 24h ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoList && cryptoList.allIds && cryptoList.allIds.map((id, key)=>(
                        id ?
                            <tr id="portfolio-tr" onClick={()=>{onClick(cryptoList.byId[id])}} key={key}>
                                <td scope="col">
                                    <img src={`/static/icon/${cryptoList && cryptoList.byId && cryptoList.byId[id] && cryptoList.byId[id].symbol && cryptoList.byId[id].symbol.toLowerCase()}.png`} className="align-content-center" height="25" width="25" / >
                                </td>
                                <td scope="col">{cryptoList.byId[id]['name']}</td>
                                <td scope="col">{cryptoList.byId[id]['symbol']}</td>
                                <td scope="col">
                                    <span className="num-span" style={{color: '#3F95EA'}}>
                                        {formatMoney(cryptoList.byId[id]['amount'], 2, 3, ',') }
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span" style={{color: '#3F95EA'}}>
                                        {cryptoList.byId[id]['buy_price']}
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span">
                                        {cryptoList.byId[id]['price_usd']}
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span">
                                        {formatMoney(calculateValuation(cryptoList.byId[id]), 2, 3, ',') }
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span">
                                        {calculatePercentage(cryptoList, id)}
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span" style={{ color: isCalculateProfitOrLoss(cryptoList.byId[id]) ? 'green' : 'red' }}>
                                        {calculateProfitOrLoss(cryptoList.byId[id])}
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span" style={{ color: isPositiveNumber(cryptoList.byId[id]['percent_change_24h']) ? 'green' : 'red' }}>
                                        {isPositiveNumber(cryptoList.byId[id]['percent_change_24h']) ? '+' : ''}
                                        {cryptoList.byId[id]['percent_change_24h']}
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span" style={{ color: isPositiveNumber(cryptoList.byId[id]['percent_change_7d']) ? 'green' : 'red' }}>
                                        {isPositiveNumber(cryptoList.byId[id]['percent_change_7d']) ? '+' : ''}
                                        {cryptoList.byId[id]['percent_change_7d']}
                                    </span>
                                </td>
                                <td scope="col">
                                    <span className="num-span">
                                        {formatMoney(cryptoList.byId[id]['24h_volume_usd'], 0, 3, ',') }
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
    cryptoList: PropTypes.object,
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

function calculatePercentage(cryptoList, id){
    let totalValuation = calculateTotalValuation(cryptoList)
    let currentValuation = calculateValuation(cryptoList.byId[id])
    let currentPercentage = ( parseFloat(currentValuation)/parseFloat(totalValuation) ) * 100;

    return currentPercentage.toFixed(2);
}

function calculateTotalValuation(cryptoList){
    let totalValuation = 0;
    cryptoList && cryptoList.allIds && cryptoList.allIds.map((id)=>{
        if(id){
            totalValuation = totalValuation + calculateValuation(cryptoList.byId[id])
        }
    })
    return totalValuation;
}

function calculateValuation(cryptoData){
    const amount = parseFloat(cryptoData.amount)
    const market_price = parseFloat(cryptoData.price_usd);
    const valuation = amount * market_price;

    return valuation;
}


function calculateProfitOrLoss(cryptoData){
    const market_price = parseFloat(cryptoData.price_usd);
    const buy_price = parseFloat(cryptoData.buy_price);
    const profitOrLoss = (market_price - buy_price) / market_price;

    if(profitOrLoss>=0){
        return `+${profitOrLoss.toFixed(2)}`;
    }

    return profitOrLoss.toFixed(2);
}

// check if its a positive or negative
function isCalculateProfitOrLoss(cryptoData){
    const market_price = parseFloat(cryptoData.price_usd);
    const buy_price = parseFloat(cryptoData.buy_price);
    const profitOrLoss = (market_price - buy_price) / market_price;

    if(profitOrLoss>=0){
        return true;
    }
    return false;
}
