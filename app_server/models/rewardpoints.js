const mongoose = require('mongoose');

const schema = mongoose.Schema;

const rewardPointsSchema = new schema({
    rewardAmount: String,
    rewardStatus: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
 })

 const reward= module.exports = mongoose.model('Reward',rewardPointsSchema);