var express = require('express');
var router = express.Router();
var order = require('../controllers/order.js');
var design = require('../controllers/design.js');
var user = require('../controllers/user.js');

router.post('/createOrder', function (req, res) {
        const body = req.body;
        var orderDetails = [];
         body.orderDetails.forEach(element => {
            var data = {
                designId: element.designId,
                quantity: element.designQuantity,
                price: element.designPrice
            };
            orderDetails.push(data);
        });
        body.orderDetails = orderDetails;
        var userData = {
            rewardPoints: body.rewardPoints,
            _id: body.createdBy
        };
        order.createOrder(body, function (err, order) {
            if (err) {
                console.log(err);
                return res.json({
                    Message: "Error in Connecting to DB",
                    status: false
                });
            }
            user.updateRewardPoints(userData, function (err, order) {
                if (err) {
                    console.log(err);
                    return res.json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                }
            })
            if(body.couponId != null) {
                var cData = {
                    _id : body.couponId
                }
                user.changeCouponStatus(cData,function (err, order) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            Message: "Error in Connecting to DB",
                            status: false
                        });
                    }
                })
            }
     
           
            const promiseArr = [];
            return new Promise((resolve, reject) => {
                orderDetails.forEach(el => {
                  promiseArr.push(
                    new Promise((resolvve, rejectt) => {
                 
                        design.updateDesignStatus(el.designId, function (err, design) {
                            resolvve(el);
                        });
                    }))
                });
                return Promise.all(promiseArr).then(ress => {
                    var result = {status : true, message: "Order Created Successfully"};
                    return res.json(result);
                });
            });


        });

    });

    router.get('/list_orders_admin', function (req, res) {
        order.getOrderList(function (err, result) {
            if (err)
                return res.json({
                    Message: "Error in Connecting to DB",
                    status: false
                });
            var reslt = {status : true, data: result};
            return res.json(reslt);
    
        });
    });
    router.get('/list_orders_customer/:userId', function (req, res) {
        order.getOrderListCustomer(req.params.userId,function (err, result) {
            if (err)
                return res.json({
                    Message: "Error in Connecting to DB",
                    status: false
                });
            var reslt = {status : true, data: result};
            return res.json(reslt);
    
        });
    });
    router.get('/list_single_order/:orderId', function (req, res) {
        order.getSingleOrder(req.params.orderId,function (err, result) {
            if (err)
                return res.json({
                    Message: "Error in Connecting to DB",
                    status: false
                });
            var reslt = {status : true, data: result};
            return res.json(reslt);
    
        });
    });




module.exports = router;