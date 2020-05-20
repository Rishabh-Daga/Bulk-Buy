var mongoose = require('mongoose');
var Schema = mongoose.Schema

var OrderSchema = new Schema(
    {
    	userId: String,
    	productId: String,
    	productName: String,
    	itemQuantity: Number,
    },
    { collection: 'orders'}
)

module.exports = mongoose.model('Order', OrderSchema)