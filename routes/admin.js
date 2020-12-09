var express = require('express');
var router = express.Router();

var AdminCtrl = require('../controllers/admin.controller');
var PostCtrl = require('../controllers/post.controller');

router
    .get(
        '/list-post',
        isAdmin,
        AdminCtrl.listPost,
    )  

    .get(
        '/accep-post/:id',
        isAdmin,
        PostCtrl.acceptPost
    )

    .get(
        '/decline-post/:id',
        isAdmin,
        PostCtrl.declinePost
    )


module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.permission >= 1) {
        return next();
    }
    res.redirect('/');
}