var mongoose = require('mongoose');

/* ----------------------------------------------------------
 * Crypto Schema
 * -------------------------------------------------------- */
const PortfolioSchema = new mongoose.Schema({
    user_id       : { type: mongoose.Schema.Types.ObjectId, require: true },
    amount        : { type: String },
    buy_price_usd : { type: String },
    buy_price_btc : { type: String },
    buy_price_eth : { type: String },
    id            : { type: String },
    value         : { type: String },
    label         : { type: String },
    symbol        : { type: String },
    notes         : { type: String },
}, { collection   : 'portfolio' });

/* ----------------------------------------------------------
 * Exports
 * -------------------------------------------------------- */
module.exports = mongoose.model('Portfolio', PortfolioSchema);
