var express = require('express');
var router = express.Router();

var AdminCtrl = require('../controllers/admin.controller');

router
    .get(
        '/list-post',
        isAdmin,
        AdminCtrl.listPost,
    )

module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.permission >= 1) {
        return next();
    }
    res.redirect('/');
}