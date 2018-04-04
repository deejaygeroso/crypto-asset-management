const jwt = require('jsonwebtoken');

const ACCOUNT_KEY = 'thebitproject-101';

const createJWT = token => {
    return jwt.sign({
        token
    }, ACCOUNT_KEY)
}

const verifyJWT = token => {
    return new Promise(resolve => {
        resolve(jwt.verify(token, ACCOUNT_KEY))
    })
}

const user = []

module.exports = class AuthService {
    constructor () {}

  logIn (email, password) {
    for (let i = 0; i < user.length; i++) {
      if (email === user[i].email) {
        return password === user[i].password ? user[i].token : false
      }
    }
    return false
  }

  createUser (email, password) {
    const token = createJWT(123456789);
    user.push({
      email,
      password,
      token
    })
    return token
  }

  isLoggedIn (req, res, next) {
    try {
      return res.redirect('/')
    } catch (err) {
      next()
      return;
    }
  }

  async isNotLoggedIn (req, res, next) {
    try {
      await verifyJWT(req.cookies['id_token'])
      next()
      return;
    } catch (err) {
      return res.redirect('/')
    }
  }
}
