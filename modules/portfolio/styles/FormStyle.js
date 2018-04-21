import React from 'react';

const FormStyle = () => (
    <style jsx global>{`
            .form-title{
                color: #53d3aa;
                text-align: center;
                font-weight: 400;
                font-size: 24px;
                margin-top: 10px;
                background-color: #12987014;
                padding: 15px;
                border-radius: 0;
            }
            .inputField{
              padding: 10px;
              margin-left: 0px !important;
              padding-left: 20px;
            }
            .Select-value{
                margin-top: 4px;
            }
            .Select-control{
                margin: 0px !important;
                padding: 0px !important;
                border-width: 0px;
                margin-left: 10px !important;
                margin-top: 5px !important;
            }
            .select-field{
                border: 2px solid rgba(0, 0, 0, 0.1);
                padding: 0 0 10px 0px;
                padding-right: 10px;
            }
            .select-field:{
                cursor: pointer !important;
            }

            .buy-price-wrapper > div{
            }

            .inputField-password{
              margin-bottom: 10px !important;
              margin-left: 0px !important;
              padding-left: 20px;
            }
            .input-lable{
                margin-top: 10px !important;
                font-weight: 500 !important;
            }
            .card-profile{
              background-color: 'black';
            }
            .password-label{
              font-size: 12px;
              pading: 0;
              margin: 0;
              margin-left: 14px;
              padding-bottom: 12px !important;
            }
            .btn-submit{
                margin-top: 20px;
            }
            .textarea-field {
              resize: vertical;
            }
            .portfolio-error{
                margin-bottom: 0px;
            }
            @media (max-width: 700px) {
                .card{
                    margin-left: 20px;
                    margin-right: 20px;
                }
            }
            .add-link-button{
                cursor: pointer;
            }
            .add-link-button:hover{
                color: #3E3C3C;
            }
  `}</style>
)

export default FormStyle;
