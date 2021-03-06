import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    commarize
} from '../../lib/helpers';

// import TableStyle from '../../styles/TableStyle';
import SortIcon from './SortIcon';

class OtherStatsTable extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        $('.pane-hScroll').scroll(function() {
            $('.pane-vScroll').width($('.pane-hScroll').width() + $('.pane-hScroll').scrollLeft());
        });
    }

    render() {
        const {portfolioList, onClick, sortTableBy, sortFieldName, sortFieldStatus} = this.props;
        return (
            <div className="pane bounceInUp animated">
                <div className="pane-hScroll">
                    <table className="profit-margin">
                        <thead>
                            <tr>
                              <th scope="col" rowSpan="2" className="th-icon">Icon</th>
                              <th scope="col" rowSpan="2" className="th-id sortable" onClick={()=>sortTableBy('name')}>Coin Name <SortIcon name="name" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                              <th scope="col" rowSpan="2" className="th-symbol sortable" onClick={()=>sortTableBy('symbol')}>Symbol <SortIcon name="symbol" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                              <th scope="col" rowSpan="2" className="th-amount sortable" onClick={()=>sortTableBy('amount')}>Market Price (USD) <SortIcon name="price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                              <th scope="col" colSpan="3" className="table-th-colspan">% Change</th>
                              <th scope="col" rowSpan="2" className="th-amount sortable" onClick={()=>sortTableBy('market_cap_usd')}>Market Price (USD) <SortIcon name="market_cap_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                              <th scope="col" colSpan="3" className="table-th-colspan">Supply</th>
                           </tr>
                            <tr>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('buy_price_usd')}}>USD <SortIcon name="buy_price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('buy_price_btc')}}>BTC <SortIcon name="buy_price_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('buy_price_eth')}}>ETH <SortIcon name="buy_price_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('price_usd')}}>USD <SortIcon name="price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('price_btc')}}>BTC <SortIcon name="price_btc" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                                <th className="th-sub sortable" onClick={()=>{sortTableBy('price_eth')}}>ETH <SortIcon name="price_eth" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus} /></th>
                            </tr>
                        </thead>
                    </table>

                    <div className="pane-vScroll">
                        <table className="profit-margin">
                            <tbody>
                                {portfolioList && portfolioList.allIds_otherStats && portfolioList.allIds_otherStats.map((id, key)=>(
                                    id ?
                                        <tr className="portfolio-tr" onClick={()=>{onClick(portfolioList.byId[id])}} key={key}>
                                            { /* ------- Icon ------ */ }
                                           <td className="td-icon" scope="col">
                                                <img src={`/static/icon/${portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id].symbol && portfolioList.byId[id].symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="25" width="25" />
                                            </td>
                                            { /* ------- Name ------ */ }
                                            <td className="td-id" scope="col">{portfolioList.byId[id]['name']}</td>
                                            { /* ------- Symbol ------ */ }
                                            <td className="td-symbol" scope="col">{portfolioList.byId[id]['symbol']}</td>
                                            { /* ------- Market Price / Buy Price USD ------ */ }
                                            <td className="td-amount" scope="col">
                                                    <span className="num-span">
                                                        {formatMoney(guarding(portfolioList, id, 'price_usd'))}
                                                    </span>
                                            </td>
                                            { /* ------- 1h % Change ------ */ }
                                            <td className="td-sub" scope="col">
                                                <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_1h'] && portfolioList.byId[id]['percent_change_1h'] > 0 ? 'green' : 'red' }}>
                                                    {guarding(portfolioList, id, 'percent_change_1h')}
                                                </span>
                                            </td>
                                            { /* ------- 24h % Change ------ */ }
                                            <td className="td-sub" scope="col">
                                                <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_24h'] && portfolioList.byId[id]['percent_change_24h'] > 0 ? 'green' : 'red' }}>
                                                {guarding(portfolioList, id, 'percent_change_24h')}
                                                </span>
                                            </td>
                                            { /* ------- 7d % Change ------ */ }
                                            <td className="td-sub" scope="col">
                                                <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_7d'] && portfolioList.byId[id]['percent_change_7d'] > 0 ? 'green' : 'red' }}>
                                                {guarding(portfolioList, id, 'percent_change_7d')}
                                                </span>
                                            </td>
                                            { /* ------- Market Cap (USD) ------ */ }
                                            <td className="td-amount" scope="col">
                                                <span className="num-span">
                                                    {commarize(guarding(portfolioList, id, 'market_cap_usd'))}
                                                </span>
                                            </td>
                                            { /* ------- Circulating/Available Supply ------ */ }
                                            <td className="td-sub" scope="col">
                                                <span className="num-span">
                                                    {commarize(guarding(portfolioList, id, 'available_supply'))}
                                                </span>
                                            </td>
                                            { /* ------- Maximum Supply ------ */ }
                                            <td className="td-sub" scope="col">
                                                <span className="num-span">
                                                    {portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['max_supply'] ? commarize(portfolioList.byId[id]['max_supply']) : "N/A"}
                                                </span>
                                            </td>
                                            { /* ------- Total Supply ------ */ }
                                            <td className="td-sub" scope="col">
                                                <span className="num-span">
                                                    {commarize(guarding(portfolioList, id, 'total_supply'))}
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

OtherStatsTable.propTypes = {
    portfolioList: PropTypes.object,
    onClick: PropTypes.func,
    sortTableBy: PropTypes.func,
    sortFieldName: PropTypes.string,
    sortFieldStatus: PropTypes.string,
};

export default OtherStatsTable;

function guarding(portfolioList, id, fieldName){
    return portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id][fieldName];
}