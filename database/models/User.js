const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide your username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
    },
})

UserSchema.pre('save', function(next) {
    const user = this
        // encryption rounds e.g. 10, 20 or 100 - more rounds more time 
    bcrypt.hash(user.password, 10, function(error, encrypted) {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)