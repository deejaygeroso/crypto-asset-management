var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* ----------------------------------------------------------------------------------
 * CryptoHistory Schema. Basically this is used for getting historical data of coin. 
 * -------------------------------------------------------------------------------- */
var CryptoHistorySchema = new Schema({
    id                 : { type: String, },
    name               : { type: String, },
    symbol             : { type: String, },
    rank               : { type: String, },
    price_usd          : { type: String, },
    price_btc          : { type: String, },
    "24h_volume_usd"   : { type: String, },
    market_cap_usd     : { type: String, },
    available_supply   : { type: String, },
    total_supply       : { type: String, },
    max_supply         : { type: String, },
    percent_change_1h  : { type: String, },
    percent_change_24h : { type: String, },
    percent_change_7d  : { type: String, },
    last_updated       : { type: String, },
    created            : { type: Date, default: Date.now },
}, { collection: 'cryptos' });

/* ----------------------------------------------------------
 * Exports
 * -------------------------------------------------------- */
module.exports = mongoose.model('Crypto', CryptoHistorySchema);
