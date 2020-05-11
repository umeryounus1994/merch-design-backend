var express = require('express');
var router = express.Router();

const profilePicture = require("../../config/profile_image");
var user = require('../controllers/user.js');
var userModel=require('../models/user.js');
var emailAccount =require('../../emails/account.js');


//Add Admin
router.post('/signup',profilePicture.fields([{
    name: 'profilepicture', maxCount: 1
  }]), function (req, res) {
    var body = req.body;
    if(JSON.stringify(req.files) === '{}') {
        body.profilepicture = '';
    } else {
        body.profilepicture = req.files.profilepicture[0].location;
    }

    user.addUser(body, res, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true, message: "Registered Successfully"};
        return res.json(result);
    });

});

router.post('/add_customer', function (req, res) {
    var body = req.body;
    body.profilepicture = '';
    if(body.membership != '') {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        body.subscription = 'yes';
        body.subscriptionData = [{
            subscriptionDate: yyyy + "-" + mm + "-" + dd,
            subscriptionType: body.membership,
            subscriptionAmount: '',
            startDate: body.startDate,
            expiryDate: body.endDate,
            status: 'active'
        }]
    } else {
        body.subscription = 'no';
        body.subscriptionData = [];
    }
    user.addCustomer(body, res, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true, message: "Customer Added Successfully"};
        return res.json(result);
    });

});

router.post('/edit_customer', function (req, res) {
    var body = req.body;
    body.profilepicture = '';
    if(body.membership != '') {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        body.subscription = 'yes';
        body.subscriptionData = [{
            subscriptionDate: yyyy + "-" + mm + "-" + dd,
            subscriptionType: body.membership,
            subscriptionAmount: '',
            startDate: body.startDate,
            expiryDate: body.endDate,
            status: 'active'
        }]
    } else {
        body.subscription = 'no';
        body.subscriptionData = [];
    }
    user.editCustomer(body, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true, message: "Customer Updated Successfully"};
        return res.json(result);
    });

});

router.post('/socialSignup', function (req, res) {
    var body = req.body;
    user.addUserSocial(body, res, function (err, user) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true, data: user};
        return res.json(result);
    });
  });


router.get('/list_customers', function (req, res) {
    user.getCustomerList(function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });

});
router.get('/list_sales', function (req, res) {
    user.getSalesList(function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });

});

router.get('/list_reward_points', function (req, res) {
    user.getRewardList(function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });

});

router.get('/list_coupon', function (req, res) {
    user.getCoupon(function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });

});

router.get('/deleteUser/:id', function (req, res) {
    user.removeUser(req.params.id,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true};
        return res.json(reslt);

    });

});
router.get('/getUser/:id', function (req, res) {
    user.getUserById(req.params.id,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });

});

router.post('/checkCouponUsed', function (req, res) {
    user.checkCouponUsed(req.body,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });

});

router.post('/changeStatus', function (req, res) {
    user.changeStatus(req.body._id, req.body.status, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});
router.post('/updateSale', function (req, res) {
    user.updateSale(req.body, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});

router.post('/updateReward', function (req, res) {
    user.updateReward(req.body, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});

router.post('/updateCoupon', function (req, res) {
    user.updateCoupon(req.body, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});

router.post('/expireSubscription', function (req, res) {
    user.expireSubscription(req.body.userId, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});

router.post('/subscriptionAdd', function (req, res) {
    user.subscriptionAdd(req.body, function (err, reslt) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        user.getUserById(req.body.userId,function (err, result) {
            if (err)
                return res.json({
                    Message: "Error in Connecting to DB",
                    status: false
                });
            var reslt = {status : true, data: result};
            return res.json(reslt);
    
        });
    });
});
router.post('/subscriptionUpdate', function (req, res) {
    user.subscriptionUpdate(req.body, function (err, reslt) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var reslt = {status : true};
            return res.json(reslt);
    });
});

router.post('/updateProfileAdmin', function (req, res) {
    user.updateProfileAdmin(req.body, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});

router.post('/updateProfileCustomer', function (req, res) {
    user.updateProfileCustomer(req.body, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});


router.post('/updatePassword', function (req, res) {
    user.updatePassword(req.body, res, function (err, admin) {
        if (err) {
            console.log(err);
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = {status : true};
        return res.json(result);
    });
});


//Login for Admin
router.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    user.login(email, password, res);
});

router.post('/resetPassword', function (req, res) {
    let id = req.body.id;
    var query = {_id: id};
    let record=new userModel();
    userModel.findOne(query).
    exec(function(err,result)
    {
        if (err)
		{
			return res.json({message:"Error in Connecting to DB",status:false});
		}
        else if(result)
        {
            let password = Math.random() * (1000000 - 100000) + 100000;
            password = Math.ceil(password);
            console.log(password);
            
            let customerform = {
                password : password,
                originalPassword: password,
                id: id
            }

            user.resetPassword(customerform, function (err, customer) {
                if (err) {
                    return res.status(500).json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
                else if(customer){
                    emailAccount.sendEmail(result.email,password)
                    return res.json({Message:"Password Updated, Kindly Check Email",status:true});
                }
        
            });
        }
    });
});


module.exports = router;
