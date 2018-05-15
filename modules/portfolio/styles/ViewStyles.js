import React from 'react';

const ViewStyle = () => (
    <style jsx global>{`
            .gradient-header{
                min-height: 100vh;
            }
            .card{
                padding: 15px 30px 30px 30px;
                padding-bottom: 50px;
                line-height: 1;
                box-shadow: 2px 2px 5px #888;
                max-width: 680px;
                margin-bottom: 120px;
                margin-top: 80px;
            }
            .card-image-wrapper{
                margin: 20px;
            }

            .form-view-title{
                background-color: #2e73878f;
                border-radius: 43px;
                padding: 10px 29px 7px 9px;
            }
            .form-view-title > h1{
                padding: 0 0 5px 20px;
                color: #fff;
                margin: 0;
            }
            .form-view-text{
                color: #fff;
                text-align: center;
            }
            .form-view-value{
                color: #e7ff00;
            }
            .form-view-amount{
                font-size: 67px;
                line-height: 0.8;
                color: #e7ff00;
            }
            .form-view-amount-title{
                font-size: 35px;
            }
            .form-view-links-title{
                text-align: center;
                margin: 0;
                padding: 0;
                color: aliceblue;
                margin-left: 50px;
            }
            .form-view-links{
                text-align: center;
                margin-top: 20px;
            }
            .form-view-links > a{
                background-color: #62ceba;
                min-width: 350px;
                padding: 10px 20px;
                border-radius: 20px;
                color: #fff;
                text-decoration: none;
                margin: 5px;
            }
            .form-view-links > a:hover{
                background-color: #fff;
                color: #62ceba;
            }
            .edit-button{
                position: fixed;
                background-color: white;
                right: 33px;
                top: 115px;
                background-color: #5dbeca;
                border-width: 0px;
                border-radius: 28px;
                padding: 10px 20px;
                border-width: 0px;
            }
            .edit-button > i {
                font-size: 30px;
            }
            .edit-link{
                width: 50px;
                text-align: center;
                background: #2e73878f;
                border-radius: 9px;
                padding: 8px;
                color: #fff;
                cursor: pointer;
                margin-left: 10px;
            }
            .edit-link:hover{
                background-color: #52d3aa;
            }
            .edit-portfolio{
                margin: auto;
                width: 150px;
                text-align: center;
                background: #2e73878f;
                border-radius: 9px;
                padding: 8px;
                color: #fff;
                cursor: pointer;
                margin-top: 20px;
            }
            .edit-portfolio:hover{
                background-color: #52d3aa;
            }
            .chart-button{
                position: fixed;
                background-color: white;
                right: 33px;
                top: 115px;
                background-color: #5dbeca;
                border-width: 0px;
                border-radius: 28px;
                padding: 10px 20px;
                border-width: 0px;
            }
            .chart-button > i {
                font-size: 30px;
            }
            .back-button{
                position: fixed;
                background-color: white;
                left: 33px;
                top: 115px;
                background-color: #53a4e6;
                border-width: 0px;
                border-radius: 28px;
                padding: 10px 20px;
                border-width: 0px;
            }
            .fa-button-icon{
                font-size: 40px;
                color: #fff;
            }
            .fa-button-icon:hover{
                cursor: pointer;
            }
            #chartdiv {
                width: 100%;
                height: 500px;
            }
            .amcharts-chart-div > a{
                visibility: hidden;
            }
            .total-marketcap-capitalization{
                text-align: center;
                margin-top: 15px;
                color: aliceblue;
                font-size: 50px;
            }
  `}</style>
)

export default ViewStyle;
