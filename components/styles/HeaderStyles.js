import React from 'react';

const HeaderStyles = () => (
        <style jsx global>{`
            .portfolio-header{
                padding-top: 50px;
            }
            .btn-table{
                margin-right: 10px;
                margin-left: 0px;
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
)

export default HeaderStyles;