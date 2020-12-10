var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    name: String,
    facebook: {
        id: Number,
        token: String
    },
    permission: { type: Number, default: 0 },
    countPost: { type: Number, default: 0 },
    email: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    avatar: {type: String, default: '/images/no-avatar.jpeg'},
    status: {type: Number, default: 0}
});

module.exports = mongoose.model('users', UserModelSchema);