import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    commarize
} from '../../lib/helpers';

import TableStyle from '../../styles/TableStyle';
import SortIcon from './SortIcon'

const StatsTable = ({portfolioList, onClick, sortTableBy, sortFieldName, sortFieldStatus}) => (
    <div className="bounceInUp animated">
        <div className="table-view table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col" rowSpan="2" className="sortable table-th-rowspan th-icon">Icon</th>
                      <th scope="col" rowSpan="2" className="sortable table-th-rowspan" onClick={()=>sortTableBy('name')}>Coin Name <SortIcon name="name" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                      <th scope="col" rowSpan="2" className="sortable table-th-rowspan" onClick={()=>sortTableBy('symbol')}>Symbol&nbsp;<SortIcon name="symbol" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                      <th scope="col" rowSpan="2" className="sortable table-th-rowspan nobr" onClick={()=>sortTableBy('price_usd')}>Market Price (USD) <SortIcon name="price_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                      <th scope="col" colSpan="3" className="table-th-colspan">% Change</th>
                      <th scope="col" rowSpan="2" className="sortable table-th-rowspan nobr" onClick={()=>sortTableBy('market_cap_usd')}>Market Cap (USD) <SortIcon name="market_cap_usd" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                      <th scope="col" colSpan="3" className="table-th-colspan">Supply</th>
                    </tr>
                    <tr>
                        <th className="sortable" onClick={()=>sortTableBy('percent_change_1h')}>1h <SortIcon name="percent_change_1h" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                        <th className="sortable" onClick={()=>sortTableBy('percent_change_24h')}>24h <SortIcon name="percent_change_24h" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                        <th className="sortable" onClick={()=>sortTableBy('percent_change_7d')}>7d <SortIcon name="percent_change_7d" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                        <th className="sortable" onClick={()=>sortTableBy('available_supply')}>Circulating <SortIcon name="available_supply" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                        <th className="sortable" onClick={()=>sortTableBy('max_supply')}>Maximum <SortIcon name="max_supply" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                        <th className="sortable" onClick={()=>sortTableBy('total_supply')}>Total <SortIcon name="total_supply" sortFieldName={sortFieldName} sortFieldStatus={sortFieldStatus}/></th>
                    </tr>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    {portfolioList && portfolioList.allIds_otherStats && portfolioList.allIds_otherStats.map((id, key)=>(
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
                                            {formatMoney(guarding(portfolioList, id, 'price_usd'))}
                                        </span>
                                </td>
                                { /* ------- 1h % Change ------ */ }
                                <td scope="col">
                                    <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_1h'] && portfolioList.byId[id]['percent_change_1h'] > 0 ? 'green' : 'red' }}>
                                        {guarding(portfolioList, id, 'percent_change_1h')}
                                    </span>
                                </td>
                                { /* ------- 24h % Change ------ */ }
                                <td scope="col">
                                    <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_24h'] && portfolioList.byId[id]['percent_change_24h'] > 0 ? 'green' : 'red' }}>
                                       {guarding(portfolioList, id, 'percent_change_24h')}
                                    </span>
                                </td>
                                { /* ------- 7d % Change ------ */ }
                                <td scope="col">
                                    <span className="num-span" style={{ color: portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['percent_change_7d'] && portfolioList.byId[id]['percent_change_7d'] > 0 ? 'green' : 'red' }}>
                                       {guarding(portfolioList, id, 'percent_change_7d')}
                                    </span>
                                </td>
                                { /* ------- Market Cap (USD) ------ */ }
                                <td scope="col">
                                    <span className="num-span">
                                        {commarize(guarding(portfolioList, id, 'market_cap_usd'))}
                                    </span>
                                </td>
                                { /* ------- Circulating/Available Supply ------ */ }
                                <td scope="col">
                                    <span className="num-span">
                                        {commarize(guarding(portfolioList, id, 'available_supply'))}
                                    </span>
                                </td>
                                { /* ------- Maximum Supply ------ */ }
                                <td scope="col">
                                    <span className="num-span">
                                        {portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id]['max_supply'] ? commarize(portfolioList.byId[id]['max_supply']) : "N/A"}
                                    </span>
                                </td>
                                { /* ------- Total Supply ------ */ }
                                <td scope="col">
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
    sortTableBy: PropTypes.func,
    sortFieldName: PropTypes.string,
    sortFieldStatus: PropTypes.string,
}

export default StatsTable;

function guarding(portfolioList, id, fieldName){
    return portfolioList && portfolioList.byId && portfolioList.byId[id] && portfolioList.byId[id][fieldName];
}