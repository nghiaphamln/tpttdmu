var express = require('express');
var router = express.Router();

var HomeCtrl = require('../controllers/home.controller');

/* GET home page. */
router
    .get('/', HomeCtrl.index)
    .get('/about', HomeCtrl.about)
    .get('/property-grid', HomeCtrl.gid)
    .get('/login', HomeCtrl.login)
    .get('/signup', HomeCtrl.signup)


module.exports = router;
