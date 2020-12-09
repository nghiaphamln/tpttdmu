var express = require('express');
var router = express.Router();

var AdminCtrl = require('../controllers/admin.controller');

router
    .get(
        '/listPost',
        (req, res, next) => {
            res.send('respond with a resource');
        }
    )

module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.permission >= 1) {
        return next();
    }
    res.redirect('/');
}