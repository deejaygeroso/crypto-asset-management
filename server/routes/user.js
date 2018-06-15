const Auth = require('../auth');

module.exports = function(app, router){

    router.route('/profile')
        .get(function (req, res) {
            
            const { user } = req.cookies;
            const urlSuccess = '/account/profile';
            const urlRedirect = '/login';

            Auth.userAccess(app, req, res, user, urlSuccess, urlRedirect);
        })

    router.post('/logout', (req, res)=>{
        res.clearCookie('id_token', {path: '/'})
        res.clearCookie('user', {path: '/'})
        return res.redirect('/');
    })


};
