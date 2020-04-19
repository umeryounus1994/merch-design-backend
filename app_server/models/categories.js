const mongoose = require('mongoose');

const schema = mongoose.Schema;

const categorySchema = new schema({
    categoryName: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
 })

 const category= module.exports = mongoose.model('Category',categorySchema);