const Auth = require('../auth');

module.exports = function(app, router){
    router.route('/list')
        .get((req, res) => {
            const { user } = req.cookies;
            const urlSuccess = '/portfolio/list';
            const urlRedirect = '/login';

            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);

        })
    router.route('/add')
        .get(function (req, res) {
            const { user } = req.cookies;
            const urlSuccess = '/portfolio/add';
            const urlRedirect = '/login';

            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
}
