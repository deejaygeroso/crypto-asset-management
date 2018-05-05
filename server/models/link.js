var mongoose = require('mongoose');

/* ----------------------------------------------------------
 * Crypto Schema
 * -------------------------------------------------------- */
const LinkSchema = new mongoose.Schema({
    user_id       : { type: mongoose.Schema.Types.ObjectId, require: true },
    id            : { type: String },
    name          : { type: String },
    address       : { type: String },
    isApproved    : { type: Boolean, default: false },
    created       : { type: Date, default: Date.now },
}, { collection   : 'link' });

/* ----------------------------------------------------------
 * Exports
 * -------------------------------------------------------- */
module.exports = mongoose.model('Link', LinkSchema);
