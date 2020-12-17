var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postModelSchema = new Schema({
    user: String,
    title: String,
    description: String,
    streetname: String,
    wards: String,
    district: String,
    cost: Number,
    water: Number,
    electric: Number,
    area: Number,
    roomtype: String,
    ultilities: String,
    uploadImage: String,
    time: {type: Date, default: Date.now},
    status: {type: Number, default: 0},
    idvideo: String,
    link360: String
});



module.exports = mongoose.model('posts', postModelSchema);