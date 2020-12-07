var express = require('express');
var router = express.Router();
var passport = require('passport');

var HomeCtrl = require('../controllers/home.controller');
var ManageCtrl = require('../controllers/manage.controller');

/* GET home page. */
router
    .get('/', HomeCtrl.index)
    .get('/about',HomeCtrl.about)
    .get('/property-grid', HomeCtrl.gid)
    .get('/login', HomeCtrl.login)
    .get('/signup', HomeCtrl.signup)

    .get(
        '/profileuser/:id',
        isLoggedIn,
        ManageCtrl.viewProfileUser
    )

    .get(
        '/newpost',
        isLoggedIn,
        ManageCtrl.newPost
    )

    .get(
        '/viewpost',
        isLoggedIn,
        ManageCtrl.viewPost
    )


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}