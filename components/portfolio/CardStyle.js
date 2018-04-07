import React from 'react';

const CardStyle = () => (
    <div>
        <style jsx global>{`
                body {
                    background-color: '#f1f1f1' !important;
                }
                .card{
                    margin: 10px;
                    width: 420px;
                    line-height: 1;
                    box-shadow: 2px 2px 5px #888;
                    background-color: #fff;
                    font-family: 'Lato', sans-serif;
                }
                .card-clickable{
                    cursor: pointer;
                }
                .card-clickable:hover{
                    box-shadow: 4px 4px 12px #888;
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
                    margin-top: 19px;
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
                    margin-top: 5px;
                }
                .card-price-usd > p{
                    font-size: 18px;
                }
                .card-ath-atl{
                    margin-top: 4px;
                    padding-left: 2px;
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
