var ImageModel = require('../models/image.model');
var fs = require('fs');

class PostController {
    static async uploadImage(req, res, next) {
        try {
            let newImage = new ImageModel();
            newImage.image.data = fs.readFileSync(req.files.userPhoto.path);
            newImage.image.contentType = 'image/png';
            await newImage.save();
        }
        catch (e) {
            res.status(200).send('Error manager!');
        }
    }
}

module.exports = PostController;