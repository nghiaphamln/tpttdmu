var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    
    name: String,
    facebook: {
        id: Number,
        token: String
    },

    google:{
        id: Number,
        token: String
    },

    local: {
        username: String,
        password: String,
    },
    
    permission: { type: Number, default: 0 },
    countPost: { type: Number, default: 0 },
    email: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    avatar: {type: String, default: '/images/no-avatar.jpeg'},
    status: {type: Number, default: 0}
});


UserModelSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserModelSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('users', UserModelSchema);