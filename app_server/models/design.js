const mongoose = require('mongoose');

const schema = mongoose.Schema;

var actualDesign = mongoose.Schema({
    imagePath : String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
var sourceFiles = mongoose.Schema({
    imagePath : String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const designSchema = new schema({
    designTitle: String,
    designDescription: String,
    logo: String,
    launchDateTime: String,
    actualDesign: [actualDesign],
    sourceFiles: [sourceFiles],
    designPrice: String,
    designStatus: String,
    designUsed: String,
    createdBy: String,
    lockStatus : {
        type: String,
        default: 'open'
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: String,
        default: 'no'
    }
 })

 const design= module.exports = mongoose.model('Design',designSchema);