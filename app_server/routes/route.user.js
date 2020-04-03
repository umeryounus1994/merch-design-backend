var express = require('express');
var router = express.Router();

const profilePicture = require("../../config/profile_image");
var user = require('../controllers/user.js');



//Add Admin
router.post('/signup',profilePicture.fields([{
    name: 'profilepicture', maxCount: 1
  }]), function (req, res) {
    var body = req.body;
    if(JSON.stringify(req.files) === '{}') {
        body.profilepicture = '';
    } else {
        body.profilepicture = req.files.profilepicture[0].filename.toLowerCase() ;
    }

    user.addUser(body, function (err, admin) {
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


module.exports = router;
