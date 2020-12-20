var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    
    facebook: {
        id: Number,
        token: String,
    },

    google:{
        id: Number,
        token: String
    },

    local: {
        password: String,
        name: {type: String, default: ''},
        email: {type: String, default: ''},
    },

    name: {type: String, default: ''},
    email: {type: String, default: ''},
    permission: { type: Number, default: 0 },
    countPost: { type: Number, default: 0 },
    phoneNumber: {type: String, default: ''},
    avatar: {type: String, default: '/images/no-avatar.jpeg'},
    status: {type: Number, default: 0},
    idvideo: {type: String, default: ''},
    link360: {type: String, default: ''},
    linkmap: {type: String, default: ''},
    money: {type: String, default: 0}
});
/*
var UserModelSchema = new Schema ({

    local: {
        password: String,
        name: {type: String, default: ''},
        email: {type: String, default: ''},
        permission: { type: Number, default: 0 },
        countPost: { type: Number, default: 0 },
        phoneNumber: {type: String, default: ''},
        avatar: {type: String, default: '/images/no-avatar.jpeg'},
        status: {type: Number, default: 0}
    }
});
*/


UserModelSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserModelSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('users', UserModelSchema);