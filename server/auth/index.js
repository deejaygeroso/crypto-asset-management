const UserModel = require('../models/user');

module.exports = {
    /* ----------------------------------------------------------------------------------
     * Authenticate if user exist, verified or disabled
     * redirect to urlSuccess if authenticated as admin
     * redirect to urlRedirect otherwise
     * -------------------------------------------------------------------------------- */
    userAccess: (app, req, res, user, urlSuccess, urlRedirect) => {

        if(!(user && user._id)) return app.render(req, res, urlRedirect)

        UserModel.findOne({_id: user._id}, (err, docs) => {
            // if user account is verified
            // if(docs && !docs.isVerified){
            //    return app.render(req, res, '/account/verify')
            // }
            // if user account is disabled
            if(docs && docs.isDisabled){
               return app.render(req, res, '/login')
            }
            return app.render(req, res, urlSuccess) //must double check this later
        });
    },
    /* ----------------------------------------------------------------------------------
     * Authenticate and grant admin access to user. 
     * redirect to urlSuccess if authenticated as admin
     * redirect to urlRedirect otherwise
     * -------------------------------------------------------------------------------- */
    adminAccess: (app, req, res, user, urlSuccess, urlRedirect) => {

        if(!(user && user._id)) return res.redirect(urlRedirect);

        UserModel.findOne({_id: user._id}, (err, docs) => {
            if(docs && docs.isAdmin){
                return app.render(req, res, urlSuccess)
            }
            return res.redirect(urlRedirect);
        });
    },
}
