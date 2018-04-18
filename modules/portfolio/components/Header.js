import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    // commarize
} from '../../lib/helpers';
import HeaderStyles from '../../styles/HeaderStyles';

const Header = ({user, cryptoGlobal, cryptoList, onClick}) => (
    <div className="gradient-header">
        {/* ------------------------------- */}
        {/* - Total Valuation Mobile View - */}
        {/* ------------------------------- */}
        <div className="total-valuation-mobile-view fadeIn animated">
            <span>
                Total Valuation: $ {calculateTotalValuation(cryptoList)}
            </span>
        </div>

        <div className="d-flex flex-wrap portfolio-header container">
            <div className="d-flex align-items-center justify-content-start" style={{marginTop: 15}}>
                {/* ----------------------------- */}
                {/* ------ Toggle Buttons ------- */}
                {/* ----------------------------- */}
                <div className="">
                    {/* ------ Portfolio/ Profit Margin Button ------- */}
                    <button onClick={()=>onClick('1')} className="btn-toggle btn btn-lg btn-warning btn-table flip animated" type="submit" >
                        <span>
                            <i className="fas fa-lg fa-address-card"></i>
                        </span>
                    </button>
                    {/* ------ Other Stats ------- */}
                    <button onClick={()=>onClick('3')} className="btn-toggle btn btn-lg btn-warning btn-table flip animated" type="submit" >
                        <span>
                            <i className="fas fa-lg fa-chart-line"></i>
                        </span>
                    </button>
                    {/* ------ Volume Overview ------- */}
                    <button onClick={()=>onClick('2')} className="btn-toggle btn btn-lg btn-warning btn-table flip animated" type="submit" >
                        <span>
                            <i className="fas fa-lg fa-box"></i>
                        </span>
                    </button>
                </div>
                {/* ----------------------------- */}
                {/* --------- User Info --------- */}
                {/* ----------------------------- */}
                <div className="user-name-wrapper fadeIn animated">
                    <h1 className="">{user && user.name}</h1>
                    <p className="">{user && user.email}</p>
                </div>
            </div>

            {/* ----------------------------- */}
            {/* ---- Global Crypto Info ----- */}
            {/* ----------------------------- */}
            <div className="d-flex flex-wrap flex-grow-1 flex-column align-items-end global-data fadeIn animated">
                <div className="justify-content-end">
                    <span className="total-valuation">Total Valuation: $ {calculateTotalValuation(cryptoList)}</span>
                </div>
                <div className="d-flex flex-row global-data-sub">
                    <span>Markets: {cryptoGlobal && cryptoGlobal.active_markets}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="flex-grow-1">Market Cap: $ {formatMoney(cryptoGlobal && cryptoGlobal.total_market_cap_usd, 2, 3, ',')}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="flex-grow-1">BTC Dominance: {cryptoGlobal && cryptoGlobal.bitcoin_percentage_of_market_cap} %</span>
                </div>
            </div>


        </div>

        <HeaderStyles />
    </div>
)

Header.propTypes = {
    user         : PropTypes.object,
    cryptoGlobal : PropTypes.object,
    cryptoList   : PropTypes.object,
    onClick      : PropTypes.func,
}

export default Header;

function calculateTotalValuation(cryptoList){
    let totalValuation = 0;
    cryptoList && cryptoList.allIds && cryptoList.allIds.map((id)=>{
        if(id){
            totalValuation = totalValuation + calculateValuation(cryptoList.byId[id])
        }
    })
    return formatMoney(totalValuation, 2, 3, ',');
}

function calculateValuation(cryptoData){
    const amount = parseFloat(cryptoData.amount) || 0;
    const market_price = parseFloat(cryptoData.price_usd) || 0;
    const valuation = amount * market_price;

    return valuation;
}
