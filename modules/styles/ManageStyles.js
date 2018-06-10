import React from 'react';

const ManageStyles = () => (
    <style jsx global>{`
    #user-card{
        cursor: pointer;
    }
    #user-card:hover{
        box-shadow: 3px 3px 7px #888;
    }

    #fh5co-home{
        height: 162px;
    }
    .card-container{
        margin-top: 15px;
        max-width: 580px;
        padding-bottom: 210px;
    }
    .card{
        margin: 10px;
        line-height: 1;
        box-shadow: 1px 1px 3px #888;
        padding: 10px;
    }
    .input-field{
        background-color: #f1f1f1;
        margin-right: 15px;
    }
    .user-add{
        margin-top: 50px;
    }
    .error-container{
        width: 250px;
    }
    .user-email{
        margin: 0px;
    }
    .margin-50{
        margin: 50px;
    }
    .btn-submit{
        padding-left: 22px;
    }
    .btn-action{
        margin-left:5px;
    }
    .color-danger{
        color: #d9534f;
    }
    .color-success{
        color: #5cb85c;
    }
    .color-info{
        color: #5bc0de;
    }
`}</style>
)

export default ManageStyles;

