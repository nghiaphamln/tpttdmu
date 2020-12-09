var PostModel = require('../models/posts.model');
var fs = require('fs');

class PostController {
    static async acceptPost(req, res, next) {
        var postID = req.params.id;
        await PostModel.findOne({_id: postID}, (err, doc) => {
            doc.status = 1;
            doc.save();
        });
        res.redirect('/admin/list-post');
    }

    static async declinePost(req, res, next) {
        var postID = req.params.id;
        await PostModel.findOne({_id: postID}, (err, doc) => {
            doc.status = 2;  
            doc.save();
        });
        res.redirect('/admin/list-post');
    }
}

module.exports = PostController;