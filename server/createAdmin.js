const UserModel = require('./models/user');

const createAdmin = {
    exec : () => {

        // initialized admin
        const userData = {
            email : 'deejaygeroso@gmail.com',
            password : 'tmp12345',
            isAdmin : true,
        }

        UserModel.findOne({ email: userData.email }, (err, docs) => {

            // if user already exist
            if(err) return false;

            // create user
            const newUser = new UserModel(userData); // save user to database
            newUser.save(function(err, user) {

                // if fail to save
                if(err) return false;

                console.log('----------------------------------------------------');
                console.log('------------ Admin Created Successfully! -----------');
                console.log('----------------------------------------------------');
                return true;
            });
        })


    }
}

module.exports = createAdmin;
