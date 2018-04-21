import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({message}) => {
    if(message && message===''){
        return (
            <div className="bounceIn animated">
                <div className="bs-component">
                    <div className="alert alert-dismissible alert-danger portfolio-error">
                        {message}
                    </div>
                </div>
            </div>
        );
    }
    return <div />
};

ErrorMessage.propTypes = {
    message : PropTypes.string,
};

export default ErrorMessage;