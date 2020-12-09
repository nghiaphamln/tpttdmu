var express = require('express');
var router = express.Router();
var passport = require('passport');
var multer = require('multer');

var AdminCtrl = require('../controllers/admin.controller');

router
    .get(
        '/listPost',
        AdminCtrl.listPost,
        isAdmin
    )

module.exports = router();

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.permission >= 1) {
        return next();
    }
    res.redirect('/');
}