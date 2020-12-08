var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postModelSchema = new Schema({
    user: String,
    title: String,
    description: String,
    streetname: String,
    wards: String,
    cost: String,
    uploadImage: String,
    time: {type: Date, default: Date.now},
    status: {type: Number, default: 0}
});



module.exports = mongoose.model('posts', postModelSchema);