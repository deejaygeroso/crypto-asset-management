
const Auth = require('../auth');
const urlRedirect = '/portfolio/list';

module.exports = function(app, router){
    /* ----------------------------------------------------------------------------------
     * /admin -> redirict to /admin/manage
     * -------------------------------------------------------------------------------- */
    router.route('/')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/manage';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
    /* ----------------------------------------------------------------------------------
     *  /admin/manage
     * -------------------------------------------------------------------------------- */
    router.route('/manage')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/manage';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
    /* ----------------------------------------------------------------------------------
     * /admin/userportfolio 
     * -------------------------------------------------------------------------------- */
    router.route('/userportfolio')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/userportfolio';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
    /* ----------------------------------------------------------------------------------
     * /admin/userportfolioview 
     * -------------------------------------------------------------------------------- */
    router.route('/userportfolioview')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/admin/userportfolioview';
            Auth.adminAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
};
