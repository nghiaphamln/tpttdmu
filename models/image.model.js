var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var ImageModelSchema = new Schema({
    filePath: String,
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('image', ImageModelSchema);