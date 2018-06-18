const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
const next = require('next');
const cookieParser = require('cookie-parser');
const AuthService = require('./server/services/auth');
const auth = new AuthService();
const compression = require('compression');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const PORT = dev ? 3000 : process.env.PORT;

/* ----------------------------------------------------------------------------------
 * NextJS initialization 
 * -------------------------------------------------------------------------------- */
const app = next({ dev });
const handle = app.getRequestHandler();

/* ----------------------------------------------------------------------------------
 * Mongo Setup 
 * -------------------------------------------------------------------------------- */
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// initialize and create admin account if non exist
const createAdmin = require('./server/createAdmin');
createAdmin.exec();

app.prepare()
.then(() => {

    const server = express();

    server.use(compression())
    server.use(cookieParser())
    server.use(bodyParser.json())

    server.use((req, res, next) => {
        // Also expose the MongoDB database handle so Next.js can access it.
        req.db = db
        next()
    })

    server.use('/', router);
    require('./server/routes')(app, router, auth);

    server.use('/api', router);
    require('./server/api')(app, router, auth);

    server.use('/portfolio', router);
    require('./server/routes/portfolio')(app, router, auth);

    server.use('/account', router)
    require('./server/routes/user')(app, router);

    server.use('/admin', router)
    require('./server/routes/admin')(app, router);

    server.get('*', (req, res) => {
        return handle(req, res);
    });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});







// ---------------------------------------------------------------------------------------
// var now = new Date();
// var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
// if (millisTill10 < 0) {
//      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
// }
// // every 10am execute this function
// setInterval(function(){
//     console.log("It's 10am!")
// }, millisTill10);
