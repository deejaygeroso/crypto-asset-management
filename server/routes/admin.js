
const Auth = require('../auth');
const urlRedirect = '/portfolio/list';

module.exports = function(app, router){
    router.route('/')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/manage';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
    router.route('/manage')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/manage';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })

    router.route('/userportfolio')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/userportfolio';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })

    router.route('/userportfolioview')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/userportfolioview';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
};
