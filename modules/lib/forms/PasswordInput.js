import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({id, label, placeholder, onValueChange}) => (
    <div className="form-group">
        <label className="input-lable">{label}</label>
        <input
            type="password"
            id={id}
            step="any"
            className="form-control inputField"
            placeholder={placeholder}
            onChange={(evt)=>{
                evt.preventDefault();
                onValueChange(id, evt.target.value);
            }}/>
            <p className="password-label" style={{margin: '7px 2px'}}>
                {"You can leave password empty if you don't want to change it."}
            </p>
    </div>
)

PasswordInput.propTypes = {
    id:            PropTypes.string,
    label:         PropTypes.string,
    placeholder:   PropTypes.string,
    value:         PropTypes.string,
    onValueChange: PropTypes.func,
}

export default PasswordInput;