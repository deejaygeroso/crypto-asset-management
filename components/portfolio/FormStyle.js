import React from 'react';

const FormStyle = () => (
    <style jsx global>{`
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
            .inputField{
              padding: 10px;
              margin-left: 0px !important;
              padding-left: 20px;
            }
            .Select{
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
  `}</style>
)

export default FormStyle;
