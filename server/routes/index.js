const Auth = require('../auth');

module.exports = function(app, router){

    router.route('/')
        // not yet used
        .get(function (req, res) {

            // if user is not logged in
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(!isLoggedIn){
                return app.render(req, res, '/')
            }

            const { user } = req.cookies;
            const urlSuccess = '/portfolio/list';
            const urlRedirect = '/';


            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);

        })

    router.route('/subscribe')
        // not yet used
        .get(function (req, res) {

            // if user is not logged in
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(!isLoggedIn){
                return app.render(req, res, '/')
            }

            const { user } = req.cookies;
            const urlSuccess = '/portfolio/list';
            const urlRedirect = '/subscribe';

            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);

        })

    router.route('/login')
        // not yet used
        .get(function (req, res) {

            // if user is not logged in
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(!isLoggedIn){
                return app.render(req, res, '/login')
            }

            const { user } = req.cookies;
            const urlSuccess = '/portfolio/list';
            const urlRedirect = '/login';

            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);
        })


};
