var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ProductSchema = new Schema(
    {
    	productName: String,
    	filter: String
    },
    { collection: 'products'}
)

module.exports = mongoose.model('SearchProduct', ProductSchema)