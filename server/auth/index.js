const UserModel = require('../models/user');

module.exports = {
    /* ----------------------------------------------------------------------------------
     * Authenticate if user exist and is either premium or on trial mode 
     * redirect to urlSuccess if authenticated as admin
     * redirect to urlRedirect otherwise
     * -------------------------------------------------------------------------------- */
    userAccess: (app, req, res, user, urlSuccess, urlRedirect) => {

        if(!(user && user._id)) return app.render(req, res, urlRedirect)

        UserModel.findOne({_id: user._id}, (err, docs) => {
            // if user account is disabled
            if(docs && docs.isDisabled){
               return app.render(req, res, '/login')
            }
            // if user account is 0=expired
            if(docs && docs.isPremium===0){
                return app.render(req, res, '/subscribe');
            }
            // is user account is 1=trial, 2=premium
            if(docs && docs.isPremium>0){
                return app.render(req, res, urlSuccess)
            }
            return app.render(req, res, urlRedirect)
        });
    },
    /* ----------------------------------------------------------------------------------
     * Authenticate and grant admin access to user. 
     * Does not care whether premium/trial or not.
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
