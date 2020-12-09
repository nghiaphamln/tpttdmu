var PostModel = require('../models/posts.model');


class HomeController {
    static index (req, res) {
        try {
            res.render('index', {title: 'TDMU', user: req.user, page_name: 'index'});
        } catch (exception) {
            res.status(500).send(exception);
        }
    }

    static async about (req, res) {
        try {
            res.render('about', {
                title: 'TDMU', 
                user: req.user, 
                page_name: 'about'
            });
        } 
        catch (exception) {
            res.status(404).send(exception);
        }
    }

    static async gid (req, res) {
        try {
            var listPost = await PostModel.find({status: 1});
            res.render('propertygrid', {
                title: 'TDMU', 
                user: req.user, 
                listPost: listPost,
                page_name: 'propertygrid'
            });
        } 
        catch (exception) {
            res.status(404).send(exception);
        }
    }

    static login (req, res) {
        try {
            res.render('login', {page_name: 'login'});
        } catch (exception) {
            res.status(500).send(exception);
        }
    }

    static signup (req, res) {
        try {
            res.render('signup', {page_name: 'signup'});
        } catch (exception) {
            res.status(500).send(exception);
        }
    }
}

module.exports = HomeController;