const {model, Schema} = require('mongoose');

const Category = new Schema({
    id: String,
    name: String,
    color: String
});

module.exports = model('category', Category);