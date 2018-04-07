import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = ({id, label, placeholder, value, onValueChange}) => (
    <div className="form-group">
        <label className="input-lable">{label}</label>
        <input
            type="email"
            id={id}
            step="any"
            value={value}
            className="form-control inputField"
            placeholder={placeholder}
            onChange={(evt)=>{
                evt.preventDefault();
                onValueChange(id, evt.target.value);
            }}/>
    </div>
)

EmailInput.propTypes = {
    id:            PropTypes.string,
    label:         PropTypes.string,
    placeholder:   PropTypes.string,
    value:         PropTypes.string,
    onValueChange: PropTypes.func,
}

export default EmailInput;