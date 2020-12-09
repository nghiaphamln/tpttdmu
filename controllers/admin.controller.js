var UserModel = require('../models/user.model');
var PostModel = require('../models/posts.model');


class AdminController {
    static async listPost(req, res, next) {
        var listPost = await PostModel.find({status: 0}).sort({time: -1});
        res.render(
            'admin/listpost',
            {
                user: req.user,
                listPost: listPost,
                page_name: 'deactive'
            }
        )
    }
}

module.exports = AdminController;