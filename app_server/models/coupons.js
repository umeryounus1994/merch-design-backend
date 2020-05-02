const mongoose = require('mongoose');

const schema = mongoose.Schema;

const couponSchema = new schema({
    couponCode: String,
    status: String,
    discountAmount: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
 })

 const coupon= module.exports = mongoose.model('Coupon',couponSchema);