module.exports = function(app, router){


    router.route('/list')
        // not yet used
        .get(function (req, res) {
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(isLoggedIn){
                return app.render(req, res, '/portfolio/list')
            }
            return app.render(req, res, '/login')
        })


    router.route('/add')
        // not yet used
        .get(function (req, res) {
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(isLoggedIn){
                return app.render(req, res, '/portfolio/add')
            }
            return app.render(req, res, '/login')
        })
}
