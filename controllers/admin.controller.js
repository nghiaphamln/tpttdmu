var UserModel = require('../models/user.model');
var PostModel = require('../models/posts.model');


class AdminController {
    static async listPost(req, res, next) {
        var listPost = await PostModel.find({status: 0}).sort({time: -1});
        res.render(
            'admin/listPost',
            {
                user: req.user,
                listPost: listPost
            }
        )
    }
}

module.exports = AdminController;