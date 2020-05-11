const mongoose = require('mongoose');

const schema = mongoose.Schema;

var orderDetails = mongoose.Schema({
    designId : { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
    quantity: String,
    price: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const orderSchema = new schema({
    totalAmount: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    coupon: {
        type: String,
        default : ''
    },
    orderDetails: [orderDetails],
    date : String,
    createdDate: {
        type: Date,
        default: Date.now
    },
 })

 const order= module.exports = mongoose.model('Order',orderSchema);