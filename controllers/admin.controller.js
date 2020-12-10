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

    static async member(req, res, next) {
        var status = [
            '<span class="badge badge-info">Bình thường</span>',
            '<span class="badge badge-danger"> Bị cấm </span>'
        ];
        var listUser = await UserModel.find();
        res.render(
            'admin/member',
            {
                user: req.user,
                listUser: listUser,
                page_name: 'deactive',
                status: status
            }
        )
    }

    static async banMember(req, res, next) {
        var userID = req.params.id;
        await UserModel.findOne({_id: userID}, (err, doc) => {
            doc.status = 1;
            doc.save();
            res.redirect('/admin/member');
        });
    }

    static async unbanMember(req, res, next) {
        var userID = req.params.id;
        await UserModel.findOne({_id: userID}, (err, doc) => {
            doc.status = 0;
            doc.save();
            res.redirect('/admin/member');
        });
    }
}

module.exports = AdminController;