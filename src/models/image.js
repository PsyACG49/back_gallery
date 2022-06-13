const {model, Schema} = require('mongoose');

const Image = new Schema({
    title: String,
    description: String,
    imgUrl: String,
    public_id: String
});

module.exports = model('Image', Image);