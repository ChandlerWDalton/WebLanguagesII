const {model, Schema} = require('mongoose');

const ToDo = new Schema({
    name: String,
    done: Boolean,
    id: String,
    categories: Array
});

module.exports = model('toDo', ToDo);