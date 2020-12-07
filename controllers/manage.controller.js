var UserModel = require('../models/user.model');
var ObjectId = require('mongoose').Types.ObjectId;

class ManageController {
    static async viewProfileUser(req, res, next) {
        try {
            var permisions = [
                'Thành viên',
                'Biên Tập Viên',
                'Tổng Biên Tập Viên',
                'Giám Đốc Điều Hành'
            ];
            var profileID = req.params.id;
            var userView = await UserModel.findOne({_id: new ObjectId(profileID)});
            res.render('member/profile', {
                user: req.user,
                permisions: permisions,
                userView: userView,
                page_name: 'deactive'
            });
        } 
        catch (e) {
            res.status(200).send('Error manager!');
        }
    }

    static async viewPost(req, res, next) {
        try {
            res.render('member/viewpost', {
                user: req.user,
                page_name: 'deactive'
            });
        }
        catch (e) {
            res.status(200).send('Error manager!');
        }
    }

    static async newPost(req, res, next) {
        try {
            res.render('member/newpost', {
                user: req.user,
                page_name: 'deactive'
            });
        }
        catch (e) {
            res.status(200).send('Error manager!');
        }
    }
}

module.exports = ManageController;