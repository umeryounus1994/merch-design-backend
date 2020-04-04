const multer = require('multer');
var path = require('path');

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, __basedir + '/profile/');
        },
        filename: function(req, file, cb) {
        
            var fileName = file.originalname.toLowerCase();
            cb(null, file.fieldname.toLowerCase() + '-' +  Date.now() + fileName.trim())
        }
    });
    const upload = multer({storage: storage});

    module.exports = upload;