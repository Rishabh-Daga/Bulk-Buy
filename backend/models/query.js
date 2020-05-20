var mongoose = require('mongoose');
var Schema = mongoose.Schema

var QuerySchema = new Schema(
    {
    	userId: String
    },
    { collection: 'products'}
)

module.exports = mongoose.model('Query', QuerySchema)