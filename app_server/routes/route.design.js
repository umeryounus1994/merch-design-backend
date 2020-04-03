var express = require('express');
var router = express.Router();

const designsUpload = require("../../config/designs");
var designs = require('../controllers/design.js');


router.post('/add',designsUpload.fields([
    {
    name: 'logo', maxCount: 1
    },
    {
    name: 'actualDesign', maxCount: 20
    },
    {
    name: 'sourceFiles', maxCount: 20
    }]), function (req, res) {
        const body = req.body;
        body.logo = req.files.logo[0].filename;
        var actualDesign = [];
        var sourceFiles = [];
        req.files.actualDesign.forEach(element => {
           var obj={};
           obj['imagePath'] = element.filename;
           actualDesign.push(obj);
        })
        req.files.sourceFiles.forEach(element => {
            var obj={};
            obj['imagePath'] = element.filename;
            sourceFiles.push(obj);
         });
         body.actualDesign = actualDesign;
         body.sourceFiles = sourceFiles;

         designs.addDesign(body, function (err, design) {
            if (err) {
                console.log(err);
                return res.json({
                    Message: "Error in Connecting to DB",
                    status: false
                });
            }
            var result = {status : true, message: "Design Added Successfully"};
            return res.json(result);
        });
  });

router.post('/edit',designsUpload.fields([
    {
    name: 'logo', maxCount: 1
    },
    {
    name: 'actualDesign', maxCount: 20
    },
    {
    name: 'sourceFiles', maxCount: 20
    }]), function (req, res) {
        const body = req.body;
        if(body.logoImg == 'yes') {
            body.logo = req.files.logo[0].filename;
        } else {
            body.logo = '';
        }
        var actualDesign = [];
        var sourceFiles = [];
        if(body.actualImg == "yes") {
            req.files.actualDesign.forEach(element => {
                var obj={};
                obj['imagePath'] = element.filename;
                actualDesign.push(obj);
             })
             body.actualDesign = actualDesign;
        } else {
            body.actualDesign = actualDesign;
        }
        if(body.sourceImg == "yes") {
            req.files.sourceFiles.forEach(element => {
                var obj={};
                obj['imagePath'] = element.filename;
                sourceFiles.push(obj);
             });
             
             body.sourceFiles = sourceFiles;
        } else {
            body.sourceFiles = sourceFiles;
        }


         designs.editDesign(body, function (err, design) {
            if (err) {
                console.log(err);
                return res.json({
                    Message: "Error in Connecting to DB",
                    status: false
                });
            }
            var result = {status : true, message: "Design Edited Successfully"};
            return res.json(result);
        });
  });

  router.get('/list_designs', function (req, res) {
    designs.getDesignsList(function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });
});

router.get('/list_designs_home', function (req, res) {
    designs.getDesignsListHome(function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);

    });
});
router.get('/get_single_design/:designId', function (req, res) {
    designs.getSingleDesign(req.params.designId,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true, data: result};
        return res.json(reslt);
    });
});
router.get('/deleteLogo/:designId', function (req, res) {
    designs.deleteLogo(req.params.designId,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true};
        return res.json(reslt);
    });
});
router.get('/deleteActualImages/:designId/:actualImageId', function (req, res) {
    designs.deleteActualImage(req.params.designId,req.params.actualImageId,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true};
        return res.json(reslt);
    });
});
router.get('/deleteSourceImages/:designId/:sourceImageId', function (req, res) {
    designs.deleteSourceImage(req.params.designId,req.params.sourceImageId,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true};
        return res.json(reslt);
    });
});


module.exports = router;