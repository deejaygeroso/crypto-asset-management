const UserModel = require('../models/user');
const CryptoHistoryModel = require('../models/cryptoHistory');
const PortfolioModel = require('../models/portfolio');
const LinkModel = require('../models/link');
const TransactionModel = require('../models/transaction');

const item = require('../routes/item');
const nodemailer = require('../services/nodemailer');

const ObjectId = require('mongoose').Types.ObjectId;
var uniqid = require('uniqid');

module.exports = function(app, router, auth){

    /* ----------------------------------------------------------
     * find history data of crypto
     * -------------------------------------------------------- */
    router.post('/cryptoHistory/find', (req, res)=>{
        const query = req.body;
        CryptoHistoryModel.find(query).sort({last_updated: -1}).exec((err,docs) => {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ----------------------------------------------------------
     * Find the ath/atl for price_usd & 24h_volume_usd on history
     * -------------------------------------------------------- */
    router.post('/cryptoHistory/priceAndVolumeAthAtl', (req, res)=>{
        const query = req.body;
        CryptoHistoryModel.find(query).select({'price_usd': 1, '24h_volume_usd': 1, 'id': 1}).exec((err, docs) => {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ==================================================================================
     * Account Crud Routes. 
     * ================================================================================ */
    const accountRoute = item(app, router, 'account', UserModel)
    accountRoute.find();
    accountRoute.update();

    /* ----------------------------------------------------------
     * Find all users which are not admin
     * -------------------------------------------------------- */
    router.post('/account/users', (req, res)=>{
        UserModel.find({isAdmin: false, isDeleted: false}, null, {sort: {created: -1}}, function (err, docs) {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ----------------------------------------------------------
     * Create new user from the admin
     * -------------------------------------------------------- */
    router.post('/account/register', (req, res)=>{
        const { firstname, lastname, email, password } = req.body;
        var verificationCode = uniqid();
        const userData = {
            firstname,
            lastname,
            email,
            password,
            verificationCode,
            created: new Date(),
        }

        // create a new user
        const newUser = new UserModel(userData);

        // save user to database
        newUser.save(function(err, user) {
            if(err) return res.status(400).send({message: err}); // if saving failed
            nodemailer.emailVerification('blockpsv@gmail.com', verificationCode);
            res.send(user)
        });
    })

    /* ----------------------------------------------------------
     * User login
     * -------------------------------------------------------- */
    router.post('/account/login', (req, res)=>{
        const { email, password } = req.body;
        UserModel.findOne({ email, isDeleted: false }, (err, docs) => {

            // if user does not exist
            if(err) return res.status(400).send(err)

            // if email does not exist docs returns a null value so filter it here
            if(!docs) return res.status(400).send(err)

            if(password==='') return res.status(400).send({message: 'Password empty!'})

            // check if password is matched from the database
            docs.comparePassword(password, (err, isMatch) => {

                // if error
                if(err) return res.status(400).send(err)

                if(isMatch){
                    // initialize token and userinfo for cookie
                    const token = auth.createUser(email, password)
                    const userCookie = { _id: docs._id, email, isLoggedIn: true }


                    // add isAdmin to cookie to true if user is Admin
                    if(docs.isAdmin){
                        userCookie['isAdmin'] = true;
                    } 

                    // assign cookie
                    if(token){
                        res.cookie('id_token', token);
                        res.cookie('user', userCookie);
                    }

                    return res.send(docs);
                }
                if(!isMatch) return res.status(400).send({message: err});
            });
        });
    })

    /* ----------------------------------------------------------
     * Delete a selected user by id.
     * Soft delete only.
     * -------------------------------------------------------- */
    router.post('/account/remove', (req, res)=>{
        const { _id } = req.body;
        UserModel.findById(_id, function(err, doc) {
            if(err) return res.status(400).send({message: err});
            
            // soft delete user
            doc['isDeleted'] = true;

            doc.save();
            res.send(doc)
          });
    })

    /* ----------------------------------------------------------
     * Disable/Enable account from logging in.
     * -------------------------------------------------------- */
    router.post('/account/isDisabled', (req, res)=>{
        const { _id, isDisabled } = req.body;
        UserModel.findById(_id, function(err, doc) {
            if(err) return res.status(400).send({message: err});
            
            // soft delete user
            doc['isDisabled'] = isDisabled;

            doc.save();
            res.send(doc)
          });
    })

    /* ----------------------------------------------------------------------------------
     * Verify email through verification code 
     * -------------------------------------------------------------------------------- */
    router.post('/account/verifyEmail', (req, res)=>{
        const { _id, verificationCode } = req.body;

        UserModel.findById(_id, (err, docs) => {
            if(err) return res.status(400).send({message: err});
            if(verificationCode===docs.verificationCode){
                docs.isVerified = true;
                docs.save()
                return res.send(docs)
            }
            res.status(400).send({message: 'Invalid verification code!'})
        });
    });

    /* ----------------------------------------------------------------------------------
     * Verify email through verification code 
     * -------------------------------------------------------------------------------- */
    router.post('/account/verifyEmailByAdmin', (req, res)=>{
        const { _id } = req.body;

        UserModel.findById(_id, (err, docs) => {
            if(err) return res.status(400).send({message: err});

            docs.isVerified = true;
            docs.save()
            return res.send(docs)

            // res.status(400).send({message: 'Invalid verification code!'})
        });
    });

    /* ==================================================================================
     * Portfolio Crud Routes. 
     * ================================================================================ */
    const portfolioRoute = item(app, router, 'portfolio', PortfolioModel)
    portfolioRoute.find();
    portfolioRoute.create();
    portfolioRoute.update();
    portfolioRoute.remove();

    /* ----------------------------------------------------------
     * Find all coins of user for his/her portfolio
     * -------------------------------------------------------- */
    router.post('/portfolio/list', (req, res)=>{
        const { user_id } = req.body;
        PortfolioModel.find({user_id: new ObjectId(user_id)}, (err, docs) => {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ==================================================================================
     * Link Crud Routes. 
     * ================================================================================ */
    const linkRoute = item(app, router, 'link', LinkModel)
    linkRoute.findAll();
    linkRoute.findByQuery();
    linkRoute.create();
    linkRoute.update();
    linkRoute.remove();

    /* ==================================================================================
     * Crypto Charts Crud Routes. 
     * ================================================================================ */
    const cryptosRoute = item(app, router, 'cryptos', CryptoHistoryModel)
    cryptosRoute.findByQuery();

    /* ==================================================================================
     * Transaction
     * ================================================================================ */
    const transactionRoute = item(app, router, 'transaction', TransactionModel)
    transactionRoute.findByQuery();
    transactionRoute.create();
};
