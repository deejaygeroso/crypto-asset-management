
const main_page = '/portfolio/list';
module.exports = function(app, router){

    router.route('/')
        .get(function (req, res) {
            const isAdmin = (req.cookies && req.cookies.user && req.cookies.user.isAdmin) || null;
            if(isAdmin){
                return app.render(req, res, '/admin/user')
            }
            return res.redirect(main_page);
        })
    router.route('/manage')
        .get(function (req, res) {
            const isAdmin = (req.cookies && req.cookies.user && req.cookies.user.isAdmin) || null;
            if(isAdmin){
                return app.render(req, res, '/admin/manage')
            }
            return res.redirect(main_page);
        })

    router.route('/userportfolio')
        .get(function (req, res) {
            const isAdmin = (req.cookies && req.cookies.user && req.cookies.user.isAdmin) || null;
            if(isAdmin){
                return app.render(req, res, '/admin/userportfolio')
            }
            return res.redirect(main_page);
        })

    router.route('/userportfolioadd')
        .get(function (req, res) {
            const isAdmin = (req.cookies && req.cookies.user && req.cookies.user.isAdmin) || null;
            if(isAdmin){
                return app.render(req, res, '/admin/userportfolioadd')
            }
            return res.redirect(main_page);
        })
};
