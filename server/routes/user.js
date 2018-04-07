// var UserModel = require('../models/user');
module.exports = function(app, router){

    router.route('/profile')
        // not yet used
        .get(function (req, res) {
            const isLoggedIn = (req.cookies && req.cookies.user && req.cookies.user.isLoggedIn) || null;
            if(isLoggedIn){
                return app.render(req, res, '/account/user')
            }
            return app.render(req, res, '/login')
        })

    router.post('/logout', (req, res)=>{
        res.clearCookie('id_token', {path: '/'})
        res.clearCookie('user', {path: '/'})
        return res.redirect('/');
    })


};
