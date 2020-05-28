const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
    name: { type: String, required: true},
    done: {type: Boolean, default: false}
})

module.exports = model('todo', todoSchema)