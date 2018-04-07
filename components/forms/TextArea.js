import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({id, label, placeholder, value, onValueChange}) => (
    <div className="form-group">
        <label className="input-lable">{label}</label>
        <textarea
            id={id}
            className="form-control inputField textarea-field"
            placeholder={placeholder}
            value={value}
            rows="4"
            cols="50"
            onChange={(evt)=>{
                evt.preventDefault();
                onValueChange(id, evt.target.value);
            }}/>
    </div>
)

TextArea.propTypes = {
    id:            PropTypes.string,
    label:         PropTypes.string,
    placeholder:   PropTypes.string,
    value:         PropTypes.string,
    onValueChange: PropTypes.func,
}

export default TextArea;