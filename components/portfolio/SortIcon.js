import React from 'react';
import PropTypes from 'prop-types';

const SortIcon = ({name, sortFieldName, sortFieldStatus}) => {
    return (
        <span>
            {
                name===sortFieldName ?
                    renderSortIcon(sortFieldStatus)
                :
                    <i className="fas fa-sort"></i>
            }
        </span>
    );
};

function renderSortIcon(sortFieldStatus){
    if(sortFieldStatus===''){
        return <i className="fas fa-sort"></i>
    }
    if(sortFieldStatus==='up'){
        return <i className="fas fa-sort-up"></i>
    }
    if(sortFieldStatus==='down'){
        return <i className="fas fa-sort-down"></i>
    }
}

SortIcon.propTypes = {
    name : PropTypes.string,
    sortFieldName : PropTypes.string,
    sortFieldStatus : PropTypes.string,
};

export default SortIcon;