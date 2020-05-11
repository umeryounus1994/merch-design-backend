const mongoose = require('mongoose');

const schema = mongoose.Schema;

const saleSchema = new schema({
    saleAmount: String,
    status: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
 })

 const sale= module.exports = mongoose.model('Sale',saleSchema);