import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({id, label, placeholder, value, onValueChange}) => (
    <div className="form-group">
        <label className="input-lable">{label}</label>
        <input
            type="number"
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

NumberInput.propTypes = {
    id:          PropTypes.string,
    label:       PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onValueChange: PropTypes.func,
}

export default NumberInput;