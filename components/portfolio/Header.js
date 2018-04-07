import React from 'react';
import PropTypes from 'prop-types';

import {
    formatMoney,
    // commarize
} from '../../lib/helpers';

const Header = ({user, cryptoGlobal, cryptoList, onClick}) => (
    <div className="gradient-header">
        <div className="total-valuation-mobile-view fadeIn animated">
            <span>
                Total Valuation: $ {calculateTotalValuation(cryptoList)}
            </span>
        </div>
        <div className="d-flex flex-wrap portfolio-header container">
            <div className="d-flex align-items-center justify-content-start">
                <div className="">
                    <button onClick={()=>onClick('2')} className="btn-toggle btn btn-lg btn-warning btn-table bounceInLeft animated" type="submit" >
                        <span>
                            <i className="fas fa-lg fa-address-card"></i>
                        </span>
                    </button>
                    <button onClick={()=>onClick('1')} className="btn-toggle btn btn-lg btn-warning btn-table bounceInLeft animated" type="submit" >
                        <span>
                            <i className="fas fa-lg fa-box"></i>
                        </span>
                    </button>
                    <button onClick={()=>onClick('3')} className="btn-toggle btn btn-lg btn-warning btn-table bounceInLeft animated" type="submit" >
                        <span>
                            <i className="fas fa-lg fa-chart-line"></i>
                        </span>
                    </button>
                </div>
                <div className="user-name-wrapper fadeIn animated">
                    <h1 className="">{user && user.name}</h1>
                    <p className="">{user && user.email}</p>
                </div>
            </div>
            <div className="d-flex flex-wrap flex-grow-1 flex-column align-items-end global-data fadeIn animated">
                <div className="justify-content-end">
                    <span className="total-valuation">Total Valuation: $ {calculateTotalValuation(cryptoList)}</span>
                </div>
                <div className="d-flex flex-row global-data-sub">
                    <span className="flex-grow-1">Market Cap: $ {formatMoney(cryptoGlobal && cryptoGlobal.total_market_cap_usd, 2, 3, ',')}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="flex-grow-1">BTC Dominance: {cryptoGlobal && cryptoGlobal.bitcoin_percentage_of_market_cap} %</span>
                </div>
            </div>
        </div>
        <style jsx global>{`
            .portfolio-header{
                padding-top: 50px;
            }
            .btn-table{
                margin-right: 10px;
                margin-left: 20px;
                padding: 10px;
                color: #57B4D4;
                background-color: aliceblue;
                border-color: aliceblue;
                border-radius: 20px;
            }
            .btn-table > span {
                padding: 0 6px;
            }
            .btn-table:hover, .btn-table:focus{
                background-color: #EA9B2A !important;
                border-color: #EA9B2A !important;
            }
            .btn-table:active {
                color: #57B4D4;
                background-color: aliceblue;
                border-color: aliceblue;
            }
            .user-name-wrapper{
                display: inline;
            }
            .user-name-wrapper > h1{
                display: inline;
                font-size: 30px;
                color: #fff;
            }
            .user-name-wrapper > p{
                font-size: 18px;
                margin: 0px;
                color: #fff;
            }

            .global-data{
                font-size: 20px;
                text-align: center;
                color: #fff;
            }
            .global-data-sub{
                font-size: 20px
            }
            .total-valuation{
                font-size: 50px;
                text-align: right;
            }
            .gradient-header{
                margin-top: 50px;
            }
            .total-valuation-mobile-view{
                color: #fff;
                text-align: center;
            }
            .total-valuation-mobile-view{
                display: none;
            }
            @media (min-width: 768px) and (max-width: 991px) {
                .global-data-sub{
                    font-size: 12px
                }
                .total-valuation{
                    font-size: 30px;
                }
            }
            @media (max-width: 767px) {
                .global-data{
                    display: none !important;
                }
            }
            @media (max-width: 400px) {
                .gradient-header{
                    margin-top: 33px;
                }
                .btn-toggle{
                    font-size: 12px;
                    margin-left: 5px;
                }
                .user-name-wrapper>p {
                    font-size: 14px
                }
                .user-name-wrapper>h1 {
                    font-size: 25px
                }
                .total-valuation-mobile-view{
                    display: block;
                }

            }

        `}</style>

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
    const amount = parseFloat(cryptoData.amount)
    const market_price = parseFloat(cryptoData.price_usd);
    const valuation = amount * market_price;

    return valuation;
}
