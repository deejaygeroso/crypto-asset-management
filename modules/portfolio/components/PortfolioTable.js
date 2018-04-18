import React from 'react';
import PropTypes from 'prop-types';

import {
    formatPrice,
    formatMoney,
    // commarize
} from '../../lib/helpers';

import TableStyle from '../../styles/TableStyle';
import SortIcon from './SortIcon'

const PortfolioTable = ({portfolioList, onClick, sortTableBy, sortFieldName, sortFieldStatus}) => {
        return (
            <div className="bounceInLeft animated">
                <div className="table-view table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                              <th scope="col" rowSpan="2" className="th-icon">Icon</th>
                              <th scope="col" rowSpan="2" className="sortable" onClick={()=>sortTableBy('name')}>Coin Name <SortIcon name="name" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                              <th scope="col" rowSpan="2" className="sortable" onClick={()=>sortTableBy('symbol')}>Symbol <SortIcon name="symbol" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                              <th scope="col" rowSpan="2" className="sortable" onClick={()=>sortTableBy('amount')}>Holdings <SortIcon name="amount" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                              <th scope="col" colSpan="3" className="table-th-colspan">Buy Price</th>
                              <th scope="col" colSpan="3" className="table-th-colspan">Market Price</th>
                              <th scope="col" colSpan="3" className="table-th-colspan">Valuation</th>
                              <th scope="col" colSpan="3" className="table-th-colspan">Profilt/Loss (%)</th>
                              <th scope="col" rowSpan="2" className="sortable" onClick={()=>sortTableBy('allocation')}>Allocation (%) <SortIcon name="allocation" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                            </tr>
                            <tr>
                                <th className="sortable" onClick={()=>{sortTableBy('buy_price_usd')}}>USD <SortIcon name="buy_price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('buy_price_btc')}}>BTC <SortIcon name="buy_price_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('buy_price_eth')}}>ETH <SortIcon name="buy_price_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('price_usd')}}>USD <SortIcon name="price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('price_btc')}}>BTC <SortIcon name="price_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('price_eth')}}>ETH <SortIcon name="price_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('valuation_usd')}}>USD <SortIcon name="valuation_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('valuation_btc')}}>BTC <SortIcon name="valuation_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('valuation_eth')}}>ETH <SortIcon name="valuation_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('profit_loss_usd')}}>USD <SortIcon name="profit_loss_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('profit_loss_btc')}}>BTC <SortIcon name="profit_loss_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="sortable" onClick={()=>{sortTableBy('profit_loss_eth')}}>ETH <SortIcon name="profit_loss_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioList && portfolioList.allIds_profitMargin && portfolioList.allIds_profitMargin.map((id, key)=>(
                                id ?
                                    <tr id="portfolio-tr" onClick={()=>{onClick(portfolioList.byId[id])}} key={key}>
                                        {/* ------ Icon ------*/}
                                        <td scope="col">
                                            <img src={`/static/icon/${portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id].symbol && portfolioList.byId[id].symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="25" width="25" />
                                        </td>
                                        {/* ------ Name ------*/}
                                        <td scope="col">{guarding(portfolioList, id, 'name')}</td>
                                        {/* ------ Symbol ------*/}
                                        <td scope="col">{guarding(portfolioList, id, 'symbol')}</td>
                                        {/* ------ Holdings/Amount ------*/}
                                        <td scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {formatMoney(guarding(portfolioList, id, 'amount')) }
                                            </span>
                                        </td>
                                        {/* ------ Buy Price USD ------*/}
                                        <td scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {guarding(portfolioList, id, 'buy_price_usd')}
                                            </span>
                                        </td>
                                        {/* ------ Buy Price BTC ------*/}
                                        <td scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {guarding(portfolioList, id, 'buy_price_btc')}
                                            </span>
                                        </td>
                                        {/* ------ Buy Price ETH ------*/}
                                        <td scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {guarding(portfolioList, id, 'buy_price_eth')}
                                            </span>
                                        </td>
                                        {/* ------ Market Price USD ------*/}
                                        <td scope="col">
                                            <span className="num-span td-market-price">
                                                {formatPrice(guarding(portfolioList, id, 'price_usd')) }
                                            </span>
                                        </td>
                                        {/* ------ Market Price BTC ------*/}
                                        <td scope="col">
                                            <span className="num-span td-market-price">
                                                {guarding(portfolioList, id, 'price_btc')}
                                            </span>
                                        </td>
                                        {/* ------ Market Price ETH ------*/}
                                        <td scope="col">
                                            <span className="num-span td-market-price">
                                                {guarding(portfolioList, id, 'price_eth')}
                                            </span>
                                        </td>
                                        {/* ------ Valuation USD ------*/}
                                        <td scope="col">
                                            <span className="num-span">
                                                {formatMoney(guarding(portfolioList, id, 'valuation_usd'))}
                                            </span>
                                        </td>
                                        {/* ------ Valuation BTC ------*/}
                                        <td scope="col">
                                            <span className="num-span">
                                                {formatMoney(guarding(portfolioList, id, 'valuation_btc'))}
                                            </span>
                                        </td>
                                        {/* ------ Valuation ETH ------*/}
                                        <td scope="col">
                                            <span className="num-span">
                                                {formatMoney(guarding(portfolioList, id, 'valuation_eth'))}
                                            </span>
                                        </td>
                                        {/* ------ Profit/Lostt USD % ------*/}
                                        <td scope="col">
                                            <span className="num-span" style={{ color: isProfitOrLossPositive(guarding(portfolioList, id, 'profit_loss_usd')) ? 'green' : 'red' }}>
                                                {formatProfitOrLoss(guarding(portfolioList, id, 'profit_loss_usd'))}
                                            </span>
                                        </td>
                                        {/* ------ Profit/Lostt BTC % ------*/}
                                        <td scope="col">
                                            <span className="num-span" style={{ color: isProfitOrLossPositive(guarding(portfolioList, id, 'profit_loss_btc')) ? 'green' : 'red' }}>
                                                {formatProfitOrLoss(guarding(portfolioList, id, 'profit_loss_btc'))}
                                            </span>
                                        </td>
                                        {/* ------ Profit/Lostt ETH % ------*/}
                                        <td scope="col">
                                            <span className="num-span" style={{ color: isProfitOrLossPositive(guarding(portfolioList, id, 'profit_loss_eth')) ? 'green' : 'red' }}>
                                                {formatProfitOrLoss(guarding(portfolioList, id, 'profit_loss_eth'))}
                                            </span>
                                        </td>
                                        {/* ------ Allocation % ------*/}
                                        <td scope="col">
                                            <span className="num-span">
                                                {guarding(portfolioList, id, 'allocation') ? portfolioList.byId[id].allocation.toFixed(2) : '0.00'}
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
}

PortfolioTable.propTypes = {
    sortFieldName : PropTypes.string,
    sortFieldStatus : PropTypes.string,
    portfolioList: PropTypes.object,
    onClick: PropTypes.func,
    sortTableBy : PropTypes.func,
}

export default PortfolioTable;

function guarding(portfolioList, id, fieldName){
    return portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id][fieldName];
}

/* ----------------------------------------------------------------------------------
 * Calculate percentage whether its a profit or a loss
 * Formulat: (market_price - buy_price) / market_price
 * -------------------------------------------------------------------------------- */
function formatProfitOrLoss(profitOrLoss){
    if(profitOrLoss>=0){
        return `+${formatMoney(profitOrLoss)}`;
    }
    
    return profitOrLoss ? profitOrLoss.toFixed(2) : 'N/A';
}

/* ----------------------------------------------------------------------------------
 * check if its a positive or negative
 * this is mainly used only for adding "-" or "+" to a number
 * also used for coloring green for profit and red for loss
 * -------------------------------------------------------------------------------- */
function isProfitOrLossPositive(profitOrLoss){
    if(profitOrLoss>=0){
        return true;
    }
    return false;
}
