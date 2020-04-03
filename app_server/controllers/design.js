var design=require('../models/design.js');


module.exports.addDesign = (data ,callback) =>  {
    record=new design();
    record.designTitle=data.designTitle;
    record.designDescription=data.designDescription;
    record.launchDateTime=data.launchDateTime;
    record.designStatus=data.designStatus;
    record.designUsed=data.designUsed;
    record.createdBy=data.createdBy;
    record.logo=data.logo;
    record.sourceFiles=data.sourceFiles;
    record.actualDesign=data.actualDesign;
    record.designPrice = data.designPrice;
    record.save(callback); 
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
            d[0].save(callback); 
       
        }
      });

}

module.exports.getDesignsList = (callback, limit) => {
	design.find(callback).limit(limit);
}

module.exports.getDesignsListHome = (callback, limit) => {
    var query = {designUsed: 'no', designStatus: 'active'}
	design.find(query,callback).limit(limit);
}

module.exports.getSingleDesign = (designId,callback) => {
	design.find({_id: designId},callback);
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