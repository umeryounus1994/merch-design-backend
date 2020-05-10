const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
var path = require('path');

aws.config.update({
    secretAccessKey: '4JG5eTrI7vzJez5k+FvLl/6xorLRNqyH5ET269qq',
    accessKeyId: 'AKIAJGCHYZ7QA5YNQ3CQ',
    region: 'eu-west-3'
  });

  const s3 = new aws.S3();

  const upload = multer({
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: 'merchdesignclub',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_METADATA'});
      },
      key: function (req, file, cb) {
        var fileName = file.originalname.toLowerCase();
        cb(null, Date.now().toString())
      }
    })
  });

    // const storage = multer.diskStorage({
    //     destination: function(req, file, cb){
    //         cb(null, __basedir + '/profile/');
    //     },
    //     filename: function(req, file, cb) {
        
    //         var fileName = file.originalname.toLowerCase();
    //         cb(null, file.fieldname.toLowerCase() + '-' +  Date.now() + fileName.trim())
    //     }
    // });
    // const upload = multer({storage: storage});

    module.exports = upload;