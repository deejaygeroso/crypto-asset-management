import React, { Component } from 'react';
import PropTypes from 'prop-types';


import {
    formatPrice,
    formatMoney,
    // commarize
} from '../../lib/helpers';

// import TableStyle from '../../styles/TableStyle';
import SortIcon from './SortIcon'

class ProfitMarginTable extends Component{

    componentDidMount() {
        $('.pane-hScroll').scroll(function() {
            $('.pane-vScroll').width($('.pane-hScroll').width() + $('.pane-hScroll').scrollLeft());
        });
    }
    
    render() {
        const {portfolioList, onClick, sortTableBy, sortFieldName, sortFieldStatus} = this.props;
        return (
            <div className="pane pane--table1 bounceInLeft animated">
                <div className="pane-hScroll">
                    <table className="profit-margin">
                        <thead>
                            <tr>
                              <th scope="col" rowSpan="2" className="th-icon">Icon</th>
                              <th scope="col" rowSpan="2" className="th-id sortable" onClick={()=>sortTableBy('id')}>Coin Name <SortIcon name="name" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                              <th scope="col" rowSpan="2" className="th-symbol sortable" onClick={()=>sortTableBy('symbol')}>Symbol <SortIcon name="symbol" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                              <th scope="col" rowSpan="2" className="th-amount sortable" onClick={()=>sortTableBy('amount')}>Holdings <SortIcon name="amount" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                              <th scope="col" colSpan="3" className="table-th-colspan">Buy Price</th>
                              <th scope="col" colSpan="3" className="table-th-colspan">Market Price</th>
                              {/* <th scope="col" colSpan="3" className="table-th-colspan">Valuation</th> */}
                              <th scope="col" colSpan="3" className="table-th-colspan-profit">Profit/Loss (%)</th>
                              <th scope="col" rowSpan="2" className="th-allocation sortable" onClick={()=>sortTableBy('allocation')}>Allocation (%) <SortIcon name="allocation" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                            </tr>
                            <tr>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('buy_price_usd')}}>USD <SortIcon name="buy_price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('buy_price_btc')}}>BTC <SortIcon name="buy_price_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('buy_price_eth')}}>ETH <SortIcon name="buy_price_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('price_usd')}}>USD <SortIcon name="price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('price_btc')}}>BTC <SortIcon name="price_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('price_eth')}}>ETH <SortIcon name="price_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                {/* <th className="th-sub sortable" onClick={()=>{sortTableBy('valuation_usd')}}>USD <SortIcon name="valuation_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th> */}
                                {/* <th className="th-sub sortable" onClick={()=>{sortTableBy('valuation_btc')}}>BTC <SortIcon name="valuation_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th> */}
                                {/* <th className="th-sub sortable" onClick={()=>{sortTableBy('valuation_eth')}}>ETH <SortIcon name="valuation_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th> */}
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('profit_loss_usd')}}>USD <SortIcon name="profit_loss_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('profit_loss_btc')}}>BTC <SortIcon name="profit_loss_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('profit_loss_eth')}}>ETH <SortIcon name="profit_loss_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                            </tr>
                        </thead>
                    </table>

                <div className="pane-vScroll">
                    <table className="profit-margin">
                        <tbody>
                            {portfolioList && portfolioList.allIds_profitMargin && portfolioList.allIds_profitMargin.map((id, key)=>(
                                id ?
                                    <tr className="portfolio-tr" onClick={()=>{onClick(portfolioList.byId[id])}} key={key}>
                                        {/* ------ Icon ------*/}
                                        <td className="td-icon" scope="col">
                                            <img src={`/static/icon/${portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id].symbol && portfolioList.byId[id].symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="25" width="25" />
                                        </td>
                                        {/* ------ Name ------*/}
                                        <td className="td-id" scope="col">{guarding(portfolioList, id, 'name') ? guarding(portfolioList, id, 'name') : getPortfolioName(portfolioList, id, 'id') }</td>
                                        {/* ------ Symbol ------*/}
                                        <td className="td-symbol" scope="col">{guarding(portfolioList, id, 'symbol')}</td>
                                        {/* ------ Holdings/Amount ------*/}
                                        <td className="td-amount" scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {formatMoney(guarding(portfolioList, id, 'amount')) }
                                            </span>
                                        </td>
                                        {/* ------ Buy Price USD ------*/}
                                        <td className="td-sub" scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {guarding(portfolioList, id, 'buy_price_usd')}
                                            </span>
                                        </td>
                                        {/* ------ Buy Price BTC ------*/}
                                        <td className="td-sub" scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {parseFloat(guarding(portfolioList, id, 'buy_price_btc')).toFixed(8)}
                                            </span>
                                        </td>
                                        {/* ------ Buy Price ETH ------*/}
                                        <td className="td-sub" scope="col">
                                            <span className="num-span" style={{color: '#3F95EA'}}>
                                                {parseFloat(guarding(portfolioList, id, 'buy_price_eth')).toFixed(8)}
                                            </span>
                                        </td>
                                        {/* ------ Market Price USD ------*/}
                                        <td className="td-sub" scope="col">
                                            <span className="num-span td-market-price">
                                                {formatPrice(guarding(portfolioList, id, 'price_usd')) }
                                            </span>
                                        </td>
                                        {/* ------ Market Price BTC ------*/}
                                        <td className="td-sub" scope="col">
                                            <span className="num-span td-market-price">
                                                {parseFloat(guarding(portfolioList, id, 'price_btc')).toFixed(8)}
                                            </span>
                                        </td>
                                        {/* ------ Market Price ETH ------*/}
                                        <td className="td-sub" scope="col">
                                            <span className="num-span td-market-price">
                                                {parseFloat(guarding(portfolioList, id, 'price_eth')).toFixed(8)}
                                            </span>
                                        </td>
                                        {/* ------ Valuation USD ------*/}
                                        {/* <td className="td-sub" scope="col">
                                            <span className="num-span">
                                                {formatMoney(guarding(portfolioList, id, 'valuation_usd'))}
                                            </span>
                                        </td> */}
                                        {/* ------ Valuation BTC ------*/}
                                        {/* <td className="td-sub" scope="col">
                                            <span className="num-span">
                                                {formatMoney(guarding(portfolioList, id, 'valuation_btc'))}
                                            </span>
                                        </td> */}
                                        {/* ------ Valuation ETH ------*/}
                                        {/* <td className="td-sub" scope="col">
                                            <span className="num-span">
                                                {formatMoney(guarding(portfolioList, id, 'valuation_eth'))}
                                            </span>
                                        </td> */}
                                        {/* ------ Profit/Lostt USD % ------*/}
                                        <td className="td-sub-profit" scope="col">
                                            <span className="num-span" style={{ color: isProfitOrLossPositive(guarding(portfolioList, id, 'profit_loss_usd')) ? 'green' : 'red' }}>
                                                {formatProfitOrLoss(guarding(portfolioList, id, 'profit_loss_usd'))}
                                            </span>
                                        </td>
                                        {/* ------ Profit/Lostt BTC % ------*/}
                                        <td className="td-sub-profit" scope="col">
                                            <span className="num-span" style={{ color: isProfitOrLossPositive(guarding(portfolioList, id, 'profit_loss_btc')) ? 'green' : 'red' }}>
                                                {formatProfitOrLoss(guarding(portfolioList, id, 'profit_loss_btc'))}
                                            </span>
                                        </td>
                                        {/* ------ Profit/Lostt ETH % ------*/}
                                        <td className="td-sub-profit" scope="col">
                                            <span className="num-span" style={{ color: isProfitOrLossPositive(guarding(portfolioList, id, 'profit_loss_eth')) ? 'green' : 'red' }}>
                                                {formatProfitOrLoss(guarding(portfolioList, id, 'profit_loss_eth'))}
                                            </span>
                                        </td>
                                        {/* ------ Allocation % ------*/}
                                        <td className="td-allocation" scope="col">
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
                </div>
            </div>
        );
    }
}

ProfitMarginTable.propTypes = {
    sortFieldName : PropTypes.string,
    sortFieldStatus : PropTypes.string,
    portfolioList: PropTypes.object,
    onClick: PropTypes.func,
    sortTableBy : PropTypes.func,
};

export default ProfitMarginTable;



function guarding(portfolioList, id, fieldName){
    return portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id][fieldName];
}

/* ----------------------------------------------------------------------------------
 * Get the portfolio name from portfolio id 
 * Basically used with custom portfolios
 * -------------------------------------------------------------------------------- */
function getPortfolioName(portfolioList, id, fieldName){
    const portfolioName = portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id][fieldName];
    return portfolioName.charAt(0).toUpperCase() + portfolioName.slice(1);
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
