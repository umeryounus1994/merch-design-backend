const multer = require('multer');
var path = require('path');

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, __basedir + '/designs/');
        },
        filename: function(req, file, cb) {
        
            cb(null, file.fieldname.toLowerCase() + '-' +  Date.now() + file.originalname.toLowerCase())
        }
    });
    const upload = multer({storage: storage});

    module.exports = upload;