var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema(
    {
        email: String,
        password: String,
        passwordHash: String
    },
    { collection: 'users'}
)

module.exports = mongoose.model('Login', UserSchema)