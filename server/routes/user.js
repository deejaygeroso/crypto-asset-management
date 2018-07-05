const Auth = require('../auth');

module.exports = function(app, router){

    /* ----------------------------------------------------------------------------------
     * /account/profile 
     * -------------------------------------------------------------------------------- */
    router.route('/profile')
        .get(function (req, res) {
            
            const { user } = req.cookies;
            const urlSuccess = '/account/profile';
            const urlRedirect = '/login';

            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
    /* ----------------------------------------------------------------------------------
     * /account/verify 
     * -------------------------------------------------------------------------------- */
    router.route('/verify')
        .get(function (req, res) {

            // if user is not logged in
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(!isLoggedIn){
                return app.render(req, res, '/')
            }

            const { user } = req.cookies;
            const urlSuccess = '/portfolio/list';
            const urlRedirect = '/account/verify'; // not sure about this

            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);
        })
    /* ----------------------------------------------------------------------------------
     * /account/logout 
     * -------------------------------------------------------------------------------- */
    router.post('/logout', (req, res)=>{
        res.clearCookie('id_token', {path: '/'})
        res.clearCookie('user', {path: '/'})
        return res.redirect('/');
    })


};
