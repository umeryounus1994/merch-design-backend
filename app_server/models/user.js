const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema = mongoose.Schema;

// User Schema

var sucbscriptionData = mongoose.Schema({
    subscriptionDate : String,
    subscriptionType: String,
    subscriptionAmount: Number,
    expiryDate: String,
    status: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new schema({
   firstname: {
       type: String,
   },
   lastname: {
    type:String
   },
    email:{
        type:String
    },
    password:{
        type:String
    },
    cell: {
        type:String
    },
    gender: {
        type:String
    },
    address: {
        type:String
    },
    postcode: {
        type:String
    },
    profilepicture: {
        type:String
    },
    role:{
        type:String,
    },
    logintype: {
        type:String
    },
    status: {
        type:String
    },
    subscription: {
        type: String,
        default: 'no'
    },
    subscriptionData: [sucbscriptionData],
    createdDate: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: String,
        default: 'no'
    }
    

})
userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash)
}

const user= module.exports = mongoose.model('User',userSchema);