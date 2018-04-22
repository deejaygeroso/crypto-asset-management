const UserModel = require('../models/user');
const CryptoIdsModel = require('../models/cryptoIds');
const CryptoHistoryModel = require('../models/cryptoHistory');
const PortfolioModel = require('../models/portfolio');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(app, router, auth){

    /* ----------------------------------------------------------
     * find history data of crypto
     * -------------------------------------------------------- */
    router.post('/cryptoHistory/find', (req, res)=>{
        const query = req.body;
        CryptoHistoryModel.find(query,null, {sort: {last_updated: -1}}, (err, docs) => {
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

    /* ----------------------------------------------------------
     * find all cryptoIds used for crypto selection
     * -------------------------------------------------------- */
    router.post('/crypto/findAll', (req, res)=>{
        CryptoIdsModel.find({}, (err, docs) => {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ----------------------------------------------------------
     * Find all users which are not admin
     * -------------------------------------------------------- */
    router.post('/account/users', (req, res)=>{
        UserModel.find({isAdmin: false, isDeleted: false}, function (err, docs) {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ----------------------------------------------------------
     * Find user
     * -------------------------------------------------------- */
    router.post('/account/find', (req, res)=>{
        const userData = req.body;

        // if userData object is empty return an error
        if(Object.keys(userData).length===0 || !userData._id || userData._id===''){
            return res.send({message: 'No data was passed as a parameter!'});
        }

        UserModel.findOne(userData, (err, docs) => {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ----------------------------------------------------------
     * Update an existing user
     * -------------------------------------------------------- */
    router.post('/account/update', (req, res)=>{
        const { _id } = req.body;
        const userData = req.body;

        UserModel.findById(_id, function(err, doc) {
            if(err) return res.status(400).send({message: err});

            // assign all the data to be saved/updated
            const userDataKeys = Object.keys(userData);
            userDataKeys.map(data=>{
                doc[data] = userData[data]
            })

            doc.save();
            res.send(userData)
          });
    })

    /* ----------------------------------------------------------
     * Create new user from the admin
     * -------------------------------------------------------- */
    router.post('/account/register', (req, res)=>{
        const { email, password } = req.body;

        // create a new user
        const newUser = new UserModel({ email, password });

        // save user to database
        newUser.save(function(err, user) {
            if(err) return res.status(400).send({message: err}); // if saving failed
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
                    if(docs.isAdmin) userCookie['isAdmin'] = true;

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
     * Find portfolio.
     * -------------------------------------------------------- */
    router.post('/portfolio/find', (req, res)=>{
        const userData = req.body;

        // if userData object is empty return an error
        if(Object.keys(userData).length===0 || !userData._id || userData._id===''){
            return res.send({message: 'No portfolio id was passed as a parameter!'});
        }

        PortfolioModel.findOne(userData, (err, docs) => {
            if(err) return res.status(400).send({message: err});
            res.send(docs)
        });
    })

    /* ----------------------------------------------------------
     * Add new coin to user's portfolio
     * -------------------------------------------------------- */
    router.post('/portfolio/create', (req, res)=>{

        // create a new portfolio
        const newPortfolio = new PortfolioModel({
            user_id       : req.body.user_id,
            amount        : req.body.amount,
            buy_price_usd : req.body.buy_price_usd,
            buy_price_btc : req.body.buy_price_btc,
            buy_price_eth : req.body.buy_price_eth,
            notes         : req.body.notes,
            id            : req.body.id,
            value         : req.body.value,
            label         : req.body.label, 
            symbol        : req.body.symbol, 
            links         : req.body.links,
            isCustom      : req.body.isCustom,
        });

        // save user to database
        newPortfolio.save(function(err, portfolio) {
            if(err) return res.status(400).send({message: err}); // if saving failed
            res.send(portfolio)
        });
    })

    /* ----------------------------------------------------------
     * Update an existing portfolio
     * -------------------------------------------------------- */
    router.post('/portfolio/update', (req, res)=>{
        const { _id } = req.body;
        const portfolioData = req.body;

        PortfolioModel.findById(_id, function(err, doc) {
            if(err) return res.status(400).send({message: err});

            // assign all the data to be saved/updated
            const portfolioDataKeys = Object.keys(portfolioData);
            portfolioDataKeys.map(data=>{
                doc[data] = portfolioData[data]
            })

            doc.save();
            res.send(doc)
          });
    })

    router.post('/portfolio/remove', (req, res)=>{
        const { _id } = req.body;
        PortfolioModel.remove({ _id }, function (err) {
            if(err) return res.status(400).send({message: err});
            res.send({message: 'Removing of data was successful!'})
        });
    })


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



};
