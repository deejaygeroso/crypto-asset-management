var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

/* ----------------------------------------------------------------------------------
 * User Schema. Also named as an account on some code on the system. 
 * -------------------------------------------------------------------------------- */
var UserSchema = new Schema({
    crypto_ids   : [],
    name         : { type : String },
    firstname    : { type : String },
    lastname     : { type : String },
    verificationCode : { type : String },
    email        : { type : String, required : true, index: { unique: true } },
    password     : { type : String, required : false },
    isAdmin      : { type : Boolean, default : false },
    isDeleted    : { type : Boolean, default : false },
    isDisabled   : { type : Boolean, default : false },
    isVerified   : { type : Boolean, default : false },
    created      : { type: Date, default: Date.now },
}, { collection : 'users' });

/* ----------------------------------------------------------------------------------
 * Before Save. 
 * -------------------------------------------------------------------------------- */
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/* ----------------------------------------------------------------------------------
 * Check for password if matched. 
 * -------------------------------------------------------------------------------- */
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/* ----------------------------------------------------------
 * Exports
 * -------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema);
