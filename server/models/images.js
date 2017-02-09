var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    folder: String,
    archive: String,
    points: {type: Number, default: 0}
});

mongoose.model('Image', ImageSchema);