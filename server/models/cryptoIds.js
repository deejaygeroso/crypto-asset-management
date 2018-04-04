var mongoose = require('mongoose');

/* ----------------------------------------------------------
 * Crypto Schema
 * -------------------------------------------------------- */
const CryptoIdsSchema = new mongoose.Schema({
    id         : { type: String },
    name         : { type: String },
    string         : { type: String },
}, { collection: 'crypto_ids' });

/* ----------------------------------------------------------
 * Exports
 * -------------------------------------------------------- */
module.exports = mongoose.model('CryptoIds', CryptoIdsSchema);
