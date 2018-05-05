import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewLink extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { portfolio, linkList, onEdit } = this.props;
        return (
            <div className="container flex-column align-items-center justify-content-center mt-20">

                {/* ------------------------------*/}
                {/* ------ Form View Title ------ */}
                {/* ------------------------------*/}
                <div className="d-flex align-items-center justify-content-center mt-30">
                    <div className="d-flex align-items-center justify-content-center icon-wrapper form-view-title">
                        <img src={`/static/icon/${portfolio && portfolio.symbol && portfolio.symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="80" width="80" />
                        <h1 className=" pl-10">{portfolio && portfolio.id ? portfolio.id.charAt(0).toUpperCase() + portfolio.id.slice(1) : ""}</h1>
                    </div>
                </div>
                <div className="edit-link" onClick={onEdit}>
                    Edit Link
                </div>

                {/* ------------------------------*/}
                {/* ------------ Links ---------- */}
                {/* ------------------------------*/}
                <div className="d-flex flex-column align-items-center justify-content-center form-view-links">
                    { linkList && linkList.allIds && linkList.allIds.length!==0 && linkList.allIds.map((_id)=>(
                        <a target="_blank" href={getUrlLink(linkList && linkList.byId && linkList.byId[_id] && linkList.byId[_id].address)} key={_id}>
                            {linkList && linkList.byId && linkList.byId[_id] && linkList.byId[_id].name}
                        </a>
                    )) }
                </div>
            </div>
        );
    }
}

/* ----------------------------------------------------------------------------------
 * Add http:// protocol for links that does not have it.
 * -------------------------------------------------------------------------------- */
function getUrlLink(address){
    if(!address){
        return ''
    }
    if( (address.substring(0, 7)==='http://') || (address.substring(0, 8)==='https://') ){
        return address;
    }
    return `http://${address}`;
}

ViewLink.propTypes = {
    portfolio : PropTypes.object,
    linkList  : PropTypes.object,
    onEdit    : PropTypes.func.isRequired,
};

export default ViewLink;