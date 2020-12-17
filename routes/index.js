var express = require('express');
var router = express.Router();
var passport = require('passport');

var HomeCtrl = require('../controllers/home.controller');
var ManageCtrl = require('../controllers/manage.controller');
var PostCtrl = require('../controllers/post.controller');

/* GET home page. */
router
    .get(
        '/', 
        HomeCtrl.index
    )

    .get(
        '/about',
        HomeCtrl.about
    )

    .get(
        '/property-grid', 
        HomeCtrl.gid
    )

    .get(
        '/login', 
        HomeCtrl.login
    )

    .get(
        '/signup', 
        HomeCtrl.signup
    )

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

    .post(
        '/addpost',
        isLoggedIn,
        ManageCtrl.newPostUpLoad
    )

    .get(
        '/viewpost',
        isLoggedIn,
        ManageCtrl.viewPost
    )

    .get(
        '/delete-post/:id',
        isLoggedIn,
        PostCtrl.deletePost
    )

    .get(
        '/property-single/:id',
        PostCtrl.singlePost
    )

    .post(
        '/updateprofile/:id',
        isLoggedIn,
        ManageCtrl.updateProfile
    )

    .post(
        '/newPostUpLoad/:id',
        isLoggedIn,
        ManageCtrl.newPostUpLoad
    )

    .get(
        '/logout', 
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    )

    .get(
        '/auth/facebook',
        passport.authenticate('facebook')
    )

    .get(
        '/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    )

    .get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
    // the callback after google has authenticated the user
    .get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/'
        }))

    .post(
        '/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash: true
        })
    )

    

    



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}