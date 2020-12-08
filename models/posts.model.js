var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postModelSchema = new Schema({
    title: String,
    description: String,
    streetname: String,
    wards: String,
    cost: String,
    uploadImage: String,
    time: {type: Date, default: Date.now}
});



module.exports = mongoose.model('post', postModelSchema);