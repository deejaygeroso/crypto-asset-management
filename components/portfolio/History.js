import React from 'react';
import PropTypes from 'prop-types';

import { commarize } from '../../lib/helpers';
import moment from 'moment';

const History = ({id, cryptoHistory}) => (
    <div className="history-wrapper">
        <hr className="history-hr"/>
        <h1 className="history-title">7 DAY VOLUME & PRICE HISTORY</h1>
        <div className="d-flex flex-wrap align-items-center justify-content-center">
            {
                loopDate(cryptoHistory[id])
            }
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-center m-0 p-0">
            {
                loopData(cryptoHistory[id])
            }
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-center m-0 p-0">
            {
                loopPrice(cryptoHistory[id])
            }
        </div>
        <style jsx global>{`
            .history-wrapper{
                padding-bottom: 13px;
            }
            .history-hr{
                margin: 3px;
            }
            .history-title{
                margin: 0px;
                font-size: 15px;
                font-weight: 500;
                text-align: center;
                margin-top: 7px;
            }
            .history-box{
                width: 55px;
            }
            .history-box-date{
            }
            .history-sub-text{
                font-size: 8.2px !important;
                font-family: Verdana, Geneva, sans-serif;
            }
        `}</style>
    </div>
)

History.propTypes = {
    id : PropTypes.string,
    cryptoHistory : PropTypes.object,
}

export default History;

/* ----------------------------------------------------------
 * map all the 24h_volume_usd from cryptoHistory data
 * -------------------------------------------------------- */
function loopData(cryptoHistory){
    const data = []
    for (var i = 0; i < 7; i++) {
        if(cryptoHistory && cryptoHistory[i] && cryptoHistory[i].length!==0){
            data.push(
                <div key={i} className="history-box text-center">
                    <p className="history-sub-text align-middle text-center">
                        {commarize(cryptoHistory[i]['24h_volume_usd'])}
                    </p>
                </div>
            )
        }else{
            data.push(
                <div key={i} className="history-box text-center">
                    <p className="history-sub-text align-middle text-center">
                        N/A
                    </p>
                </div>
            )
        }
    }
    return data;
}
/* ----------------------------------------------------------
 * map all the 24h_volume_usd from cryptoHistory data
 * -------------------------------------------------------- */
function loopPrice(cryptoHistory){
    const data = []
    for (var i = 0; i < 7; i++) {
        if(cryptoHistory && cryptoHistory[i] && cryptoHistory[i].length!==0){
            data.push(
                <div key={i} className="history-box text-center">
                    <p className="history-sub-text align-middle text-center">
                        {commarize(cryptoHistory[i]['price_usd'])}
                    </p>
                </div>
            )
        }else{
            data.push(
                <div key={i} className="history-box text-center">
                    <p className="history-sub-text align-middle text-center">
                        N/A
                    </p>
                </div>
            )
        }
    }
    return data;
}

/* ----------------------------------------------------------
 * map all the last_updated from cryptoHistory data
 * which corresponds to 24h_volume_usd data looped
 * -------------------------------------------------------- */
function loopDate(cryptoHistory){
    const data = []
    for (var i = 0; i < 7; i++) {
        if(cryptoHistory && cryptoHistory[i] && cryptoHistory[i].length!==0){
            data.push(
                <div key={i} className="history-box history-box-date text-center">
                    <p className="font-size-10 align-middle">
                        {moment.utc(cryptoHistory[i]['last_updated']*1000).format('MMM DD')}
                    </p>
                </div>
            )
        }else{
            data.push(
                <div key={i} className="history-box history-box-date text-center">
                    <p className="font-size-11 text-center align-middle">
                        -
                    </p>
                </div>
            )
        }
    }
    return data;

}
