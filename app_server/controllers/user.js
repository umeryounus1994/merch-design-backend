var user=require('../models/user.js');


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

// Get Admin By Id
module.exports.getUserById = (id ,callback) =>  {
	user.findById(id, callback);
}

// Add User 
module.exports.addUser = (data ,callback) =>  {
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

// Delete User   
module.exports.removeUser = (id, callback) => {
    var query = {_id: id};
    user.remove(query, callback);
}