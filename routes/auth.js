var express = require('express');

var router = express.Router();

const {signUpController,loginController} = require('../controllers/aunthentication');

// Not needed
// POST '/auth/signup'
router.post('/register', signUpController);

// POST 'auth/login'
router.post('/login',loginController );

//Logout
// GET '/logout'
router.get('/logout', (req, res, next) => {
    req.session.destroy( (err) => {
      res.redirect('/login');
    })
  })


module.exports = router;
