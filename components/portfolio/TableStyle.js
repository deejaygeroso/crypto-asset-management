import React from 'react';

const TableStyle = () => (
    <style jsx global>{`

            #portfolio-tr{
                cursor: pointer;
            }
            .table-view{
                margin: 15px 0px;
                border-radius: 10px
            }
            .table{
                font-size: 13px;
            }
            .table-th-colspan{
                text-align: center;

            }
            .table-th-rowspan{
                padding-bottom: 25px;
            }
            .th-icon{
                border-left: none !important;
            }
            .td-market-price{
                margin-right: 15px;
            }
  `}</style>
)

export default TableStyle;
