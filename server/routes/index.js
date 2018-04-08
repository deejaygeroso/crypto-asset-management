module.exports = function(app, router){

    router.route('/')
        // not yet used
        .get(function (req, res) {
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(isLoggedIn){
                return app.render(req, res, '/portfolio/list')
            }
                return app.render(req, res, '/')
        })

    router.route('/login')
        // not yet used
        .get(function (req, res) {
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(isLoggedIn){
                return app.render(req, res, '/portfolio/list')
            }
                return app.render(req, res, '/')
        })


};
