var UserModel = require('../models/user.model');
var PostModel = require('../models/posts.model')
var ObjectId = require('mongoose').Types.ObjectId;
var multer = require('multer');

var CLIENT = 'AUJoKVGO3q1WA1tGgAKRdY6qx0qQNIQ6vl6D3k7y64T4qh5WozIQ7V3dl3iusw5BwXYg_T5FzLCRguP8';
var SECRET = 'EOw8LNwDhM7esrQ3nHfzKc7xiWnJc83Eawln4YLfUgivfx1LGzu9Mj0F5wlarilXDqdK9Q5aHVo-VGjJ';
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';

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
    static async payPal(req, res, next){
      express()
      // Set up the payment:
      // 1. Set up a URL to handle requests from the PayPal button
      .post('/my-api/create-payment/', function(req, res)
      {
        // 2. Call /v1/payments/payment to set up the payment
        request.post(PAYPAL_API + '/v1/payments/payment',
        {
          auth:
          {
            user: CLIENT,
            pass: SECRET
          },
          body:
          {
            intent: 'sale',
            payer:
            {
              payment_method: 'paypal'
            },
            transactions: [
            {
              amount:
              {
                total: '5.99',
                currency: 'USD'
              }
            }],
            redirect_urls:
            {
              return_url: 'https://example.com',
              cancel_url: 'https://example.com'
            }
          },
          json: true
        }, function(err, response)
        {
          if (err)
          {
            console.error(err);
            return res.sendStatus(500);
          }
          // 3. Return the payment ID to the client
          res.json(
          {
            id: response.body.id
          });
        });
      })
      // Execute the payment:
      // 1. Set up a URL to handle requests from the PayPal button.
      .post('/my-api/execute-payment/', function(req, res)
      {
        // 2. Get the payment ID and the payer ID from the request body.
        var paymentID = req.body.paymentID;
        var payerID = req.body.payerID;
        // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
        request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
          '/execute',
          {
            auth:
            {
              user: CLIENT,
              pass: SECRET
            },
            body:
            {
              payer_id: payerID,
              transactions: [
              {
                amount:
                {
                  total: '10.99',
                  currency: 'USD'
                }
              }]
            },
            json: true
          },
          function(err, response)
          {
            if (err)
            {
              console.error(err);
              return res.sendStatus(500);
            }
            // 4. Return a success response to the client
            res.json(
            {
              status: 'success'
            });
          });
      })
    // Run `node ./server.js` in your terminal
    }

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

    static async viewPostID(req, res, next) {
      try {
          var listPostID = await PostModel.find({_id: req.params.id});
          res.render('member/editpost', {
              user: req.user,
              _id: req.id,
              listPostID: listPostID,
              title: req.title,
              description: req.description,
              streetname: req.streetname,
              district: req.district,
              wards: req.wards,
              water: req.water,
              electric: req.electric,
              cost: req.cost,
              area: req.area,
              ultilities: req.ultilities,
              roomtype: req.roomtype,
              uploadImage: req.uploadImage,
              link360: req.link360,
              idvideo: req.idvideo
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

    static async updatePost(req, res, next) {
      try {
        upload(req, res, function(err) {
          if (err instanceof multer.MulterError) {
              res.json({"kq":0, "errMsg":"A Multer error occurred when uploading."});
          } else if (err) {
              res.json({"kq":0, "errMsg":"An unknown error occurred when uploading." + err});
          } else {
            var postID = req.params.id;
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
                var uploadImage = null;
            }

            PostModel.findOne({_id: postID}, (err, doc) => {
                doc.title = title;
                doc.description = description;
                doc.streetname = streetname;
                doc.wards = wards;
                doc.district = district;
                doc.cost = cost;
                doc.water = water;
                doc.electric = electric;
                doc.area = area;
                doc.ultilities = ultilities;
                doc.roomtype = roomtype;
                if (uploadImage) {
                    doc.uploadImage = uploadImage;
                }
                doc.save();
            });

            res.redirect('/viewpost');
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