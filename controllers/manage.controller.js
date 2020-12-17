var UserModel = require('../models/user.model');
var PostModel = require('../models/posts.model')
var ObjectId = require('mongoose').Types.ObjectId;
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
}); 

var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpeg" || file.mimetype=="image/jpg" || file.mimetype=="image/gif"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("Image");


class ManageController {
    static async viewProfileUser(req, res, next) {
        try {
            var permisions = [
                'Thành viên',
                'Duyệt bài',
                'Admin'
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
            var status = [
                '<span class="badge badge-info">Đang đợi duyệt</span>',
                '<span class="badge badge-success">Đã duyệt</span>',
                '<span class="badge badge-danger">Từ chối</span>'
            ];
            var listPost = await PostModel.find({user: req.user._id});
            res.render('member/viewpost', {
                user: req.user,
                listPost: listPost,
                status: status,
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

    static async newPostUpLoad(req, res, next) {
        try {
            upload(req, res, function(err) {
                if (err instanceof multer.MulterError) {
                    res.json({"kq":0, "errMsg":"A Multer error occurred when uploading."});
                } else if (err) {
                    res.json({"kq":0, "errMsg":"An unknown error occurred when uploading." + err});
                } else {
                    var title = req.body.title;
                    var description = req.body.description;
                    var streetname = req.body.streetname;
                    var wards = req.body.wards;
                    var district = req.body.district;
                    var cost = req.body.cost; 
                    var water = req.body.water;
                    var electric = req.body.electric;
                    var area = req.body.area;
                    var ultilities = req.body.ultilities;
                    var roomtype = req.body.roomtype;
                    try {
                        var uploadImage = '/uploads/' + req.file.filename;
                    } 
                    catch {
                        var uploadImage = '/images/about1.jpg';
                    }

                    var newPost = new PostModel();
                    newPost.user = req.user._id;
                    newPost.title = title;
                    newPost.description = description;
                    newPost.streetname = streetname;
                    newPost.district = district;
                    newPost.wards = wards;
                    newPost.water = water;
                    newPost.electric = electric;
                    newPost.cost = cost;
                    newPost.area = area;
                    newPost.ultilities = ultilities;
                    newPost.roomtype = roomtype;
                    newPost.uploadImage = uploadImage;

                    newPost.save();

                    res.redirect('/viewpost');
                }
            });     
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            upload(req, res, function(err) {
                if (err instanceof multer.MulterError) {
                    res.json({"kq":0, "errMsg":"A Multer error occurred when uploading."});
                } else if (err) {
                    res.json({"kq":0, "errMsg":"An unknown error occurred when uploading." + err});
                } else {
                    var name = req.body.name
                    var phoneNumber = req.body.phoneNumber;
                    var email = req.body.email;
                    var profileID = req.params.id;
                    try {
                        var avatar = '/uploads/' + req.file.filename;
                    } 
                    catch {
                        var avatar = null;
                    }

                    UserModel.findOne({_id: new ObjectId(profileID)}, (err, doc) => {
                        doc.name = name;
                        doc.email = email;
                        doc.phoneNumber = phoneNumber;
                        if (avatar) {
                            doc.avatar = avatar;
                        }
                        doc.save();
                    });

                    res.redirect('/profileuser/' + profileID);
                }
            });     
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}

module.exports = ManageController;