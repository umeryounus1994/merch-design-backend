var user=require('../models/user.js');
var sales=require('../models/sale.js');
var reward=require('../models/rewardpoints.js');

var coupon=require('../models/coupons.js');
// Get Admins
module.exports.getAdmin = (callback, limit) => {
	user.find(callback).limit(limit);
}

// Login
module.exports.login = (email,password,res) => {
    var record=new user();
    user.findOne({email:email},function(err,result)
    {
        if(err)
        return res.json({message:"Error in Connecting to DB",status:false});
        else if(result)
        {
            if(record.comparePassword(password,result.password))
            {
                var result1 = {status: true, data: result};
                return res.json(result1);
            }
            else
            return res.json({message:"Wrong Email or Password",status:false});
        
        }
        else
        return res.json({message:"Wrong Email or Password",status:false});
    });
}

module.exports.getCustomerList = (callback, limit) => {
    var query = { 'role': 'customer' };
	user.find(query,callback).limit(limit);
}
module.exports.getSalesList = (callback, limit) => {
	sales.find(callback).limit(limit);
}

module.exports.getRewardList = (callback, limit) => {
	reward.find(callback).limit(limit);
}

module.exports.getCoupon = (callback, limit) => {
	coupon.find(callback).limit(limit);
}

// Get Admin By Id
module.exports.getUserById = (id ,callback) =>  {
	user.findById(id, callback);
}

// Add User 
module.exports.addUser = (data , res,callback) =>  {
    user.findOne({email:data.email, role: data.role},function(err,result)
    {
        if(result) {
            return res.json({message:"User with same email and Login Type already exist",status:false});
        }
        record=new user();
        record.firstname=data.firstname;
        record.lastname=data.lastname;
        record.cell=data.cell;
        record.gender=data.gender;
        record.address=data.address;
        record.postcode=data.postcode;
        record.profilepicture=data.profilepicture;
        record.role=data.role;
        record.logintype=data.logintype;
        record.status=data.status;
        record.email=data.email;
        record.password=record.hashPassword(data.password);
        record.subscriptionData = [];
        record.save(callback);
    });
}


module.exports.addCustomer = (data , res,callback) =>  {
    user.findOne({email:data.email},function(err,result)
    {
        if(result) {
            return res.json({message:"User with same email already exist",status:false});
        }
        record=new user();
        record.firstname=data.firstname;
        record.lastname=data.lastname;
        record.cell=data.cell;
        record.gender=data.gender;
        record.address=data.address;
        record.postcode=data.postcode;
        record.profilepicture=data.profilepicture;
        record.role=data.role;
        record.logintype=data.logintype;
        record.status=data.status;
        record.email=data.email;
        record.subscription=data.subscription;
        record.password=record.hashPassword(data.password);
        record.originalPassword=data.password;
        record.subscriptionData = data.subscriptionData;
        record.save(callback);
    });
}

module.exports.editCustomer = (data ,callback) =>  {
  
        var query = {_id: data.userId}; 
        var rec = new user();
        var record = {};
        record.firstname=data.firstname;
        record.lastname=data.lastname;
        record.cell=data.cell;
        record.gender=data.gender;
        record.address=data.address;
        record.postcode=data.postcode;
        record.profilepicture=data.profilepicture;
        record.email=data.email;
        record.subscription=data.subscription;
        record.password=rec.hashPassword(data.password);
        record.originalPassword=data.password;
        record.subscriptionData = data.subscriptionData;
        user.findOneAndUpdate(query, record, callback);
}
// Add Social User 
module.exports.addUserSocial = (data , res,callback) =>  {
    user.findOne({email:data.email, role: data.role},function(err,result)
    {
        if(result) {
            return res.json({data: result,status:true});
        }
        record=new user();
        record.firstname=data.firstname;
        record.lastname=data.lastname;
        record.cell=data.cell;
        record.gender=data.gender;
        record.address=data.address;
        record.postcode=data.postcode;
        record.profilepicture=data.profilepicture;
        record.role=data.role;
        record.logintype=data.logintype;
        record.status=data.status;
        record.email=data.email;
        record.password=data.password;
        record.subscriptionData = [];
        record.save(callback);
    });
}

module.exports.updateSale = (data, options, callback) => {
    var query = {_id: data._id};
    var update = {
        saleAmount: data.saleAmount,
        status:data.status
    }
    sales.findOneAndUpdate(query, update, options, callback);
}
module.exports.updateRewardPoints = (data, options, callback) => {
    var query = {_id: data._id};
    var update = {
        rewardPoints: data.rewardPoints,
    }
    user.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateReward = (data, options, callback) => {
    var query = {_id: data._id};
    var update = {
        rewardAmount: data.rewardAmount,
        rewardStatus:data.rewardStatus
    }
    reward.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateCoupon = (data, options, callback) => {
    var query = {_id: data._id};
    var update = {
        couponCode: data.couponCode,
        discountAmount:data.discountAmount,
        status: data.status
    }
    coupon.findOneAndUpdate(query, update, options, callback);
}

module.exports.changeCouponStatus = (data, options, callback) => {
    var query = {_id: data._id};
    var update = {
        status: 'no'
    }
    coupon.findOneAndUpdate(query, update, options, callback);
}
// Update User 
module.exports.updateProfileAdmin = (data, options, callback) => {
    var query = {_id: data._id};
    var update = {
        firstname: data.firstname,
        lastname:data.lastname
    }
    user.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateProfileCustomer = (data, options, callback) => {
    var query = {_id: data._id};
    var update = {
        firstname: data.firstname,
        lastname:data.lastname,
        cell: data.cell,
        address: data.address,
        postcode: data.postcode,
        gender: data.gender
    }
    user.findOneAndUpdate(query, update, options, callback);
}

module.exports.updatePassword = (data, res, callback) => {
    var query = {_id: data._id};
    var record=new user();
    user.findOne(query,function(err,result)
    {
        if(err)
        return res.json({message:"Error in Connecting to DB",status:false});
        else if(result)
        {
            if(!record.comparePassword(data.password,result.password))
            {
                return res.json({message:"Old Password does not match",status:false});
            } else {
                var update = {
                    password: record.hashPassword(data.newPassword),
                }
                user.findOneAndUpdate(query, update, callback);
            }
        }
        else
        return res.json({message:"Wrong Email or Password",status:false});
    });


}

module.exports.changeStatus = (id, status, options, callback) => {
    var query = {_id: id};
    var update = {
        status: status
    }
    user.findOneAndUpdate(query, update, options, callback);
}

module.exports.expireSubscription = (id, options, callback) => {
    var query = {_id: id};
    var update = {
        subscription: 'expired'
    }
    user.findOneAndUpdate(query, update, options, callback);
}


module.exports.subscriptionAdd = (data, options, callback) => {
    var query = {_id: data.userId};
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    var subData = [{
        startDate: yyyy + "-" + mm + "-" + dd,
        subscriptionDate: data.subscriptionDate,
        subscriptionType: data.subscriptionType,
        subscriptionAmount: data.subscriptionAmount,
        expiryDate: data.expiryDate,
        status: 'active'
    }];
    var upData = {
        subscription: 'yes',
        subscriptionData: subData
    }
    user.findOneAndUpdate(query, upData, options, callback);
}

module.exports.subscriptionUpdate = (data, callback) => {
    user.find({_id: data.id}, function (err, d) {
        if(d.length > 0) {
            d[0].subscription = 'yes';
            d[0].subscriptionData[0].expiryDate= data.expiryDate;
            d[0].save(callback);
        }
    })
}
// Delete User   
module.exports.removeUser = (id, callback) => {
    var query = {_id: id};
    user.remove(query, callback);
}

module.exports.resetPassword = (data, callback) => {
    user.find({_id: data.id}, function (err, d) {
        if(d.length > 0) {
            var rec = new user();
            d[0].password = rec.hashPassword(data.password);
            d[0].originalPassword= data.originalPassword;
            d[0].save(callback);
        }
    })
}