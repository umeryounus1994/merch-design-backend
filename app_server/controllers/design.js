var design=require('../models/design.js');
var category=require('../models/categories.js');

module.exports.addDesign = (data ,callback) =>  {
    record=new design();
    record.designTitle=data.designTitle;
    record.designDescription=data.designDescription;
    record.launchDateTime=data.launchDateTime;
    record.designStatus=data.designStatus;
    record.designUsed=data.designUsed;
    record.createdBy=data.createdBy;
    record.logo=data.logo;
    record.categoryId=data.categoryId;
    record.sourceFiles=data.sourceFiles;
    record.actualDesign=data.actualDesign;
    record.designPrice = data.designPrice;
    record.save(callback); 
}

module.exports.addCategory = (data ,callback) =>  {
    record=new category();
    record.categoryName=data.categoryName;
    record.save(callback); 
}

module.exports.editCategory = (data ,callback) =>  {
    var query = { _id: data.categoryId };
    category.find(query, function (err, d) {
        if(d.length>0) {
            d[0].categoryName=data.categoryName;
            d[0].save(callback); 
        }
    });
}
module.exports.deleteCategory = (categoryId,callback) => {
	var query = {_id: categoryId};
    category.remove(query, callback);
}
module.exports.getCategories = (callback, limit) => {
	category.find(callback).limit(limit);
}

module.exports.editDesign = (data ,callback) =>  {
    var query = { _id: data.designId };
    var actualDesign = [];
    var sourceFiles = [];
    design.find(query, function (err, d) {
        if(d.length>0) {
            actualDesign = d[0].actualDesign;
            sourceFiles = d[0].sourceFiles;

            if(data.actualDesign.length > 0) {
                data.actualDesign.forEach(element => {
                    var obj={};
                    obj['imagePath'] = element.imagePath;
                    actualDesign.push(obj);
                 })
            }
            if(data.sourceFiles.length > 0) {
                data.sourceFiles.forEach(element => {
                    var obj={};
                    obj['imagePath'] = element.imagePath;
                    sourceFiles.push(obj);
                 })
            }

            d[0].designTitle=data.designTitle;
            d[0].designDescription=data.designDescription;
            d[0].launchDateTime=data.launchDateTime;
            d[0].logo=data.logo != '' ? data.logo : d[0].logo;
            d[0].sourceFiles=sourceFiles;
            d[0].actualDesign=actualDesign;
            d[0].designPrice = data.designPrice;
            d[0].categoryId=data.categoryId;
            d[0].save(callback); 
       
        }
      });

}

module.exports.updateDesignStatus = (id ,callback) =>  {
    var query = { _id: id };
    design.find(query, function (err, d) {
        if(d.length>0) {
            d[0].designUsed='yes';
            d[0].save(callback); 
        }
        })
}

module.exports.lockDesignStatus = (data ,res) =>  {
    var query = { _id: data.id };
    design.find(query, function (err, d) {
        if(d.length>0) {
            console.log(d[0])
            if(d[0].lockStatus == 'open') {
                d[0].lockStatus=data.status;
                d[0].save();

                // unlock method is called after 5mins which is equivilant to 300000 in millliseconds
                setTimeout(function() {
                        console.log("unlock execute")
                    var query = { _id: data.id };
                    design.find(query, function (err, d) {
                        if(d.length>0) {
                                d[0].lockStatus="open";
                                d[0].save();
                        }
                        })

                }, 600000);

                return res.json({status: true});

            } else {
                return res.json({status: false});
            }
        }
        })

}

module.exports.unlockDesignStatus = (data ,res) =>  {
    var query = { _id: data.id };
    design.find(query, function (err, d) {
        if(d.length>0) {
                d[0].lockStatus=data.status;
                d[0].save();
                return res.json({status: true});
        }
        })
}

module.exports.getDesignsList = (callback, limit) => {
    var query = {designUsed: 'yes', designStatus: 'active'}
	design.find(query,callback).populate("categoryId").sort({"createdDate": -1}).limit(limit);
}

module.exports.getDesignsListHome = (callback, limit) => {
    var query = {designUsed: 'no', designStatus: 'active', lockStatus: 'open'}
	design.find(query,callback).populate("categoryId").limit(limit);
}

module.exports.getDesignsListDashboard = (callback, limit) => {
    var query = {designUsed: 'no', designStatus: 'active'}
	design.find(query,callback).populate("categoryId").sort({"createdDate": -1}).limit(limit);
}


module.exports.GetPrivateDesigns = (callback, limit) => {
    var query = {designUsed: 'no', designStatus: 'private'}
	design.find(query,callback).populate("categoryId").sort({"createdDate": -1}).limit(limit);
}

module.exports.getSingleDesign = (designId,callback) => {
	design.find({_id: designId},callback).populate("categoryId");
}
module.exports.deleteDesign = (designId,callback) => {
	var query = {_id: designId};
    design.remove(query, callback);
}

module.exports.deleteLogo = async function(designId,callback) {
    design.find({_id: designId}, function (err, d) {
        if(d.length > 0) {
            d[0].logo="";
            d[0].save(callback);
        }
    })
}

module.exports.deleteActualImage = (designId,actualImageId,callback) => {
    design.findByIdAndUpdate(designId, { $pull: { 'actualDesign': {_id: actualImageId}}}, callback );
}

module.exports.deleteSourceImage = (designId,sourceImageId,callback) => {
	design.findByIdAndUpdate(designId, { $pull: { 'sourceFiles': {_id: sourceImageId}}}, callback );
}

module.exports.filerDesign = (data ,callback) =>  {
    
    design.find({designUsed: 'no'}, callback).populate("categoryId");
}

module.exports.markDesignPublic = (data ,callback) =>  {
    var query = { _id: data.designId };
    design.find(query, function (err, d) {
        if(d.length>0) {
            d[0].launchDateTime= data.launchDateTime;
            d[0].designStatus = data.designStatus;
            d[0].save(callback); 
        }
        })
}
module.exports.markAllDesignPublic = (data,callback) =>  {
    
    design.updateMany({designStatus: 'private'},{ $set: { launchDateTime: data.launchDateTime ,designStatus: "active" } }, callback)
}