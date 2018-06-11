var mongoose = require('mongoose');

/* ----------------------------------------------------------
 * Crypto Schema
 * -------------------------------------------------------- */
const TransactionSchema = new mongoose.Schema({
    user_id         : { type: mongoose.Schema.Types.ObjectId, require: true },
    amount          : { type: String },
    txn_id          : { type: String },
    address         : { type: String },
    confirms_needed : { type: String },
    timeout         : { type: Number },
    status_url      : { type: String },
    qrcode_url      : { type: String },
    created         : { type: Date, default: Date.now },
}, { collection   : 'transaction' });

/* ----------------------------------------------------------
 * Exports
 * -------------------------------------------------------- */
module.exports = mongoose.model('Transaction', TransactionSchema);
