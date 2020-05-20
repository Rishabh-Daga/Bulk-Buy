var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RemoveProductSchema = new Schema(
    {
    	userId: String,
    	productName: String,
    },
    { collection: 'products'}
)

module.exports = mongoose.model('RemoveProduct', RemoveProductSchema)