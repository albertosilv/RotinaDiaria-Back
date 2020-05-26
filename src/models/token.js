const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema({
    token:{
        type: String,
        require: true
    },
})
const Token = mongoose.model('Token', tokenSchema)
module.exports = Token;