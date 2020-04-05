var order=require('../models/order.js');

module.exports.createOrder = (data ,callback) =>  {
    record=new order();
    record.totalAmount=data.totalAmount;
    record.createdBy=data.createdBy;
    record.status = data.status;
    record.orderDetails = data.orderDetails;
    record.save(callback); 
}

module.exports.getOrderList = (callback, limit) => {
	order.find(callback).populate("createdBy").populate({path: 'orderDetails.designId',select:['designTitle','logo']}).limit(limit);
}

module.exports.getOrderListCustomer = (id,callback, limit) => {
    var query = {createdBy: id}
	order.find(query, callback).populate("createdBy").populate({path: 'orderDetails.designId',select:['designTitle','logo']}).limit(limit);
}
module.exports.getSingleOrder = (id,callback, limit) => {
    var query = {_id: id}
	order.find(query, callback).populate("createdBy").populate('orderDetails.designId').limit(limit);
}