import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';

Chart.defaults.global.responsive = true;


class ViewLink extends Component {

    render() {
        const { linkList, onEdit, cryptoChartsList } = this.props;
    
        const data = {
            labels: cryptoChartsList.labels,
            datasets: [
              {
                label: 'Price USD',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(102,255,102,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 20,
                data: cryptoChartsList.price_usd,
              },
            //   {
            //     label: 'Price BTC',
            //     fill: true,
            //     lineTension: 0.1,
            //     backgroundColor: 'rgba(255, 0, 0, 1)',
            //     borderColor: 'rgba(255, 0, 120, 1)',
            //     borderCapStyle: 'butt',
            //     borderDash: [],
            //     borderDashOffset: 0.0,
            //     borderJoinStyle: 'miter',
            //     pointBorderColor: 'rgba(75,192,192,1)',
            //     pointBackgroundColor: '#ad4949',
            //     pointBorderWidth: 1,
            //     pointHoverRadius: 5,
            //     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            //     pointHoverBorderColor: 'rgba(220,220,220,1)',
            //     pointHoverBorderWidth: 2,
            //     pointRadius: 2,
            //     pointHitRadius: 20,
            //     data: cryptoChartsList.price_btc,
            //   },
            //   {
            //     label: 'Price ETH',
            //     fill: true,
            //     lineTension: 0.1,
            //     backgroundColor: 'rgba(255,140,102,0.4)',
            //     borderColor: 'rgba(75,192,192,1)',
            //     borderCapStyle: 'butt',
            //     borderDash: [],
            //     borderDashOffset: 0.0,
            //     borderJoinStyle: 'miter',
            //     pointBorderColor: 'rgba(75,192,192,1)',
            //     pointBackgroundColor: '#fff',
            //     pointBorderWidth: 1,
            //     pointHoverRadius: 5,
            //     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            //     pointHoverBorderColor: 'rgba(220,220,220,1)',
            //     pointHoverBorderWidth: 2,
            //     pointRadius: 2,
            //     pointHitRadius: 20,
            //     data: cryptoChartsList.price_eth,
            //   },
            ]
          };
        return (
            <div className="flex-column align-items-center justify-content-center mt-80 ml-80 mr-80">

                <div className="total-marketcap-capitalization">Price Chart</div>

                <div className="row">

                    {/* ------------------------------*/}
                    {/* -------- Chart/Graph -------- */}
                    {/* ------------------------------*/}
                    <div className="col-md-12 mb-30">
                        <Line data={data} />
                    </div>

                    {/* ------------------------------*/}
                    {/* ------------ Links ---------- */}
                    {/* ------------------------------*/}
                    <div className="col-md-12">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <h1 className="form-view-links-title ml-50">Links</h1>
                            <div className="edit-link" onClick={onEdit}>
                                <i className="fas fa-plus"></i>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center form-view-links">
                            { linkList && linkList.allIds && linkList.allIds.length!==0 && linkList.allIds.map((_id, key)=>(
                                linkList.byId[_id].isApproved ?
                                    <a target="_blank" href={getUrlLink(linkList && linkList.byId && linkList.byId[_id] && linkList.byId[_id].address)} key={key}>
                                        {linkList && linkList.byId && linkList.byId[_id] && linkList.byId[_id].name}
                                    </a>
                                : <div key={_id}/>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

/* ----------------------------------------------------------------------------------
 * Add http:// protocol for links that does not have it.
 * -------------------------------------------------------------------------------- */
function getUrlLink(address){
    if(!address){
        return ''
    }
    if( (address.substring(0, 7)==='http://') || (address.substring(0, 8)==='https://') ){
        return address;
    }
    return `http://${address}`;
}

ViewLink.propTypes = {
    portfolio : PropTypes.object,
    linkList  : PropTypes.object,
    cryptoChartsList : PropTypes.object,
    onEdit    : PropTypes.func.isRequired,
};

export default ViewLink;