import React from 'react';
import PropTypes from 'prop-types';

const SuccessMessage = ({message}) => {
    if(message && message===''){
        return (
            <div className="bounceIn animated">
                <div className="bs-component">
                    <div className="alert alert-dismissible alert-success">
                        {message}
                    </div>
                </div>
            </div>
        );
    }
    return <div />
};

SuccessMessage.propTypes = {
    message : PropTypes.string,
};

export default SuccessMessage;