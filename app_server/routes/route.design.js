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
        var body = req.body;
        body.logo = req.files.logo[0].location;
        var actualDesign = [];
        var sourceFiles = [];
        req.files.actualDesign.forEach(element => {
           var obj={};
           obj['imagePath'] = element.location;
           actualDesign.push(obj);
        })
        if(body.sFiles == 'yes') {
            req.files.sourceFiles.forEach(element => {
                var obj={};
                obj['imagePath'] = element.location;
                sourceFiles.push(obj);
             });
        }
 
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
  router.post('/addCategory', function (req, res) {
    const body = req.body;
    designs.addCategory(body, function (err, design) {
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
    router.post('/editCategory', function (req, res) {
        const body = req.body;
        designs.editCategory(body, function (err, design) {
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
        router.get('/deleteCategory/:id', function (req, res) {
            designs.deleteCategory(req.params.id,function (err, result) {
                if (err)
                    return res.json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                var reslt = {status : true};
                return res.json(reslt);
            });
        });
        router.get('/listCategories', function (req, res) {
            designs.getCategories(function (err, result) {
                if (err)
                    return res.json({
                        Message: "Error in Connecting to DB",
                        status: false
                    });
                var reslt = {status : true, data: result};
                return res.json(reslt);
        
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
            body.logo = req.files.logo[0].location;
        } else {
            body.logo = '';
        }
        var actualDesign = [];
        var sourceFiles = [];
        if(body.actualImg == "yes") {
            req.files.actualDesign.forEach(element => {
                var obj={};
                obj['imagePath'] = element.location;
                actualDesign.push(obj);
             })
             body.actualDesign = actualDesign;
        } else {
            body.actualDesign = actualDesign;
        }
        if(body.sourceImg == "yes") {
            req.files.sourceFiles.forEach(element => {
                var obj={};
                obj['imagePath'] = element.location;
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

router.get('/updateStatus/:designId', function (req, res) {
    designs.updateDesignStatus(req.params.designId,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true};
        return res.json(reslt);

    });
});

router.post('/lockDesignStatus', function (req, res) {
    designs.lockDesignStatus(req.body, res);
});
router.post('/unlockDesignStatus', function (req, res) {
    designs.unlockDesignStatus(req.body, res);
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

router.get('/private_designs', function (req, res) {
    designs.GetPrivateDesigns(function (err, result) {
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
router.get('/delete_design/:designId', function (req, res) {
    designs.deleteDesign(req.params.designId,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true};
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

router.post('/filerDesign', function (req, res) {
    const body = req.body;
    designs.filerDesign(body,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var desigData = [];
        result.forEach(el => {
            if(parseInt(el.designPrice) >= body.minPrice && parseInt(el.designPrice) <= body.maxPrice) {
                desigData.push(el);
            }
        });
        var reslt = {status : true, data: desigData};
        return res.json(reslt);
    });

});

router.post('/mark_design_public', function (req, res) {
    const body = req.body;
    designs.markDesignPublic(body,function (err, result) {
        if (err)
            return res.json({
                Message: "Error in Connecting to DB",
                status: false
            });
        var reslt = {status : true};
        return res.json(reslt);
    });
});

router.post('/mark_all_design_public', function (req, res) {
    const body = req.body;
    designs.markAllDesignPublic(body,function (err, result) {
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