var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new Schema(
    {
        email: String,
        firstName: String,
        lastName: String,
        password: String,
        passwordHash: String,
        type: String
    },
    { collection: 'users'}
)

module.exports = mongoose.model('User', UserSchema)