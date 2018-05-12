import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AmCharts from 'AmCharts'
// var Chart = require("react-chartjs");
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';

Chart.defaults.global.responsive = true;


class ViewLink extends Component {

    constructor(props){
        super(props);
        this.amChartsThis = this.amChartsThis.bind(this);
    }
  
    render() {
        const { portfolio, linkList, onEdit, cryptoChartsList } = this.props;
        console.log('this.props.cryptoChartsList', this.props.cryptoChartsList)
    
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
              {
                label: 'Price BTC',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(255, 0, 0, 1)',
                borderColor: 'rgba(255, 0, 120, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#ad4949',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 20,
                data: cryptoChartsList.price_btc,
              },
              {
                label: 'Price ETH',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,140,102,0.4)',
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
                pointRadius: 2,
                pointHitRadius: 20,
                data: cryptoChartsList.price_eth,
              },
            ]
          };
        return (
            <div className="flex-column align-items-center justify-content-center mt-80 ml-80 mr-80">

                {/* ------------------------------*/}
                {/* ------ Form View Title ------ */}
                {/* ------------------------------*/}
                {/* <div className="d-flex align-items-center justify-content-center mt-50">
                    <div className="d-flex align-items-center justify-content-center icon-wrapper form-view-title">
                        <img src={`/static/icon/${portfolio && portfolio.symbol && portfolio.symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="80" width="80" />
                        <h1 className=" pl-10">{portfolio && portfolio.id ? portfolio.id.charAt(0).toUpperCase() + portfolio.id.slice(1) : ""}</h1>
                    </div>
                </div> */}
                <div className="total-marketcap-capitalization">Price Chart</div>

                <div className="row">

                    <div className="col-md-12">
                    <Line data={data} />
                        {/* <LineChart data={chartData} options={{}} width="600" height="250"/> */}
                        {/* <div id="chartdiv"></div> */}
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
                            { linkList && linkList.allIds && linkList.allIds.length!==0 && linkList.allIds.map((_id)=>(
                                linkList.byId[_id].isApproved ?
                                    <a target="_blank" href={getUrlLink(linkList && linkList.byId && linkList.byId[_id] && linkList.byId[_id].address)} key={_id}>
                                        {linkList && linkList.byId && linkList.byId[_id] && linkList.byId[_id].name}
                                    </a>
                                : <div/>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    amChartsThis() {
        const { cryptoChartsList } = this.props;
        // console.log('AmCharts', AmCharts)
        // AmCharts.makeChart( "chartdiv", {
        //     "type": "serial",
        //     "theme": "patterns",
        //     "marginRight": 40,
        //     "marginLeft": 40,
        //     "marginTop":220,
        //     "autoMarginOffset": 20,
        //     "dataDateFormat": "YYYY-MM-DD",
        //     "valueAxes": [ {
        //         "id": "v1",
        //         "axisAlpha": 0,
        //         "position": "left",
        //         "ignoreAxisWidth": true
        //     } ],
        //     "balloon": {
        //         "borderThickness": 1,
        //         "shadowAlpha": 0
        //     },
        //     "graphs": [ {
        //         "id": "g1",
        //         "balloon": {
        //             "drop": true,
        //             "adjustBorderColor": false,
        //             "color": "#ffffff",
        //             "type": "smoothedLine"
        //         },
        //         "fillAlphas": 0.2,
        //         "bullet": "round",
        //         "bulletBorderAlpha": 1,
        //         "bulletColor": "#FFFFFF",
        //         "bulletSize": 5,
        //         "hideBulletsCount": 50,
        //         "lineThickness": 2,
        //         "title": "red line",
        //         "useLineColorForBulletBorder": true,
        //         "valueField": "value",
        //         "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        //     } ],
        //     "chartCursor": {
        //         "valueLineEnabled": true,
        //         "valueLineBalloonEnabled": true,
        //         "cursorAlpha": 0,
        //         "zoomable": false,
        //         "valueZoomable": true,
        //         "valueLineAlpha": 0.5
        //     },
        //     // "valueScrollbar": {
        //     //   "autoGridCount": true,
        //     //   "color": "#000000",
        //     //   "scrollbarHeight": 50
        //     // },
        //     "categoryField": "date",
        //     "categoryAxis": {
        //         "parseDates": true,
        //         "dashLength": 1,
        //         "minorGridEnabled": true
        //     },
        //     "export": {
        //         "enabled": false,
        //     },
        //     "dataProvider": cryptoChartsList,
        // });
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
    cryptoChartsList : PropTypes.array,
    onEdit    : PropTypes.func.isRequired,
};

export default ViewLink;