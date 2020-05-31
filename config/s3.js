const aws = require('aws-sdk');

 
aws.config.update({
    secretAccessKey: '4JG5eTrI7vzJez5k+FvLl/6xorLRNqyH5ET269qq',
    accessKeyId: 'AKIAJGCHYZ7QA5YNQ3CQ',
    region: 'eu-west-3'
  });
  var s3 = new aws.S3();
 
module.exports = s3;