var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ReviewSchema = new Schema(
    {
    	userId: String,
    	// customers: String,
    	// productId: String,
    	productName: String,
    	reviews: [String],
    	ratings: [Number],
    	customers: [String]
    	// itemQuantity: Number,
    },
    { collection: 'reviews'}
)

module.exports = mongoose.model('Review', ReviewSchema)