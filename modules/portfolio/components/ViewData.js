import React from 'react';
import PropTypes from 'prop-types';

const ViewData = ({portfolio, onEdit}) => {
    return (
        <div className="container flex-column align-items-center justify-content-center mt-20">

            {/* ------------------------------*/}
            {/* ------ Form View Title ------ */}
            {/* ------------------------------*/}
            {
                portfolio && portfolio.symbol ?
                    <div className="d-flex align-items-center justify-content-center mt-30">
                        <div className="d-flex align-items-center justify-content-center icon-wrapper form-view-title">
                            <img src={`/static/icon/${portfolio && portfolio.symbol && portfolio.symbol.toLowerCase()}.png`} onError={(e)=>{e.target.src="/static/images/blockpsv.png"}} className="align-content-center" height="80" width="80" />
                            <h1 className=" pl-10">{portfolio && portfolio.id ? portfolio.id.charAt(0).toUpperCase() + portfolio.id.slice(1) : ""}</h1>
                        </div>
                    </div>
                : <div />
            }
            <div className="edit-portfolio" onClick={onEdit}>
                Edit Portfolio
            </div>

            {/* ------------------------------*/}
            {/* ----------- Amount ---------- */}
            {/* ------------------------------*/}
            <div className="d-flex flex-column align-items-center justify-content-center mt-20">
                <span className="form-view-text form-view-amount">{portfolio && portfolio.amount ? parseFloat(portfolio.amount).toFixed(2) : "0.00"}</span>
                <span className="form-view-text form-view-amount-title">Holdings</span>
            </div>

            {/* ------------------------------*/}
            {/* ---------- Buy Price -------- */}
            {/* ------------------------------*/}
            <div className="d-flex flex-row align-items-center justify-content-center mt-100">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <span className="form-view-text">Buy Price (USD)</span>
                    <span className="form-view-value">{portfolio && portfolio.buy_price_usd}</span>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center ml-40 mr-40">
                    <span className="form-view-text">Buy Price (BTC)</span>
                    <span className="form-view-value">{portfolio && portfolio.buy_price_btc}</span>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <span className="form-view-text">Buy Price (ETH)</span>
                    <span className="form-view-value">{portfolio && portfolio.buy_price_eth}</span>
                </div>
            </div>
            
            {/* ------------------------------*/}
            {/* ------------ Notes ---------- */}
            {/* ------------------------------*/}
            { portfolio && portfolio.notes ?
                <div className="d-flex flex-column align-items-center justify-content-center mt-50">
                    <span className="form-view-text">Notes</span>
                    <span className="form-view-text">{portfolio && portfolio.notes}</span>
                </div> : <div/>
            }

        </div>

    );
}

ViewData.propTypes = {
    portfolio : PropTypes.object,
    onEdit    : PropTypes.func.isRequired,
};

export default ViewData;