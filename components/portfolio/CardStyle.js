import React from 'react';

const CardStyle = () => (
    <div>
        <style jsx global>{`
                body {
                    background-color: '#f1f1f1' !important;
                }
                .card{
                    margin: 10px;
                    width: 360px;
                    line-height: 1;
                    box-shadow: 2px 2px 5px #888;
                    background-color: #fff;
                    font-family: 'Lato', sans-serif;
                }
                .card p{
                    display: inline;
                    font-size: 12px;
                    line-height: 0 !important;
                }
                .card-image{
                    padding: 17px 15px 0px 20px;
                }
                .card-image > img {
                    border-radius: 50%;
                }
                .card-bit-header{
                    margin-top: 22px;
                }
                .crypto-name{
                    font-size: 24px !important;
                    font-weight: bold;
                }


                .card-24h-volume-usd{
                    margin-top: 7px;
                }
                .card-24h-volume-usd > p{
                    font-size: 18px;
                }
                .card-price-usd{
                    margin-top: 3px;
                }
                .card-price-usd > p{
                    font-size: 12px;
                }
                .card-ath-atl{
                    margin-top: 4px;
                }
                .card-ath{
                    color: #18B583;
                }
                .card-atl{
                    color: #3f95ea;
                }

                .rank{
                    width: 65px;
                }

                .history-wrapper{
                    margin-bottom: 13px;
                }
                .history-hr{
                    margin: 3px;
                }
                .history-box{
                    width: 48px;
                }
                .history-box-date{
                }
                .history-sub-text{
                    font-size: 8.2px !important;
                    font-family: Verdana, Geneva, sans-serif;
                }
                .loop-data{
                }

                .line-height-0-6{
                    line-height: 0.6 !important;
                }
                .line-height-0-4{
                    line-height: 0.6 !important;
                }
                .bckGreen{
                    background-color: green;
                }
                .bckYellow{
                    background-color: yellow;
                }


                .card-sub-info{
                    height: 65px;
                }

                .font-weight-600{
                    font-weight: 600;
                }

                .flex-grow-1 {
                    flex-grow: 1;
                }
                .flex-grow-2 {
                    flex-grow: 2;
                }
                .flex-grow-5 {
                    flex-grow: 5;
                }

                .font-size-15{
                    font-size: 15px;
                }
                .font-size-8{
                    font-size: 7px !important;
                }
                .card-profile{
                  background-color: 'black';
                }
      `}</style>
    </div>
)

export default CardStyle;
