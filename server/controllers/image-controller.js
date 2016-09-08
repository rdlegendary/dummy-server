var resemble   = require("node-resemble-js");
var cloudinary = require('cloudinary');
var fs         = require('fs-extra');
var request    = require('request').defaults({ encoding: 'base64' });
var tmp        = require('tmp');
var Image      = require('../datasets/images.js');

module.exports.verify = function(req, res){
    var userImage = req.files.file;
    var testFile  = global.absolutePath + '/images/test12.jpg';
        
            var diff = resemble(testFile).compareTo(userImage.path).ignoreAntialiasing().onComplete(function(data){
                console.log(data);
                 var matchPercentage = 100 - parseInt(data.misMatchPercentage);
                   console.log(matchPercentage);
                   res.json({match: matchPercentage});
            });
    
}

module.exports.updateValidationImage = function(req, res){
    
//Upload Files To a Third Party
var newImage   =   req.files.file.path;
cloudinary.uploader.upload(newImage, function(result) { 
   var image     = new Image();
       image.url = result.url;
       image.save();
       res.json({url: result.url});
}, {image_metadata: true});
 
}

function encodeImage(url, cb){
 request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        data = new Buffer(body, 'base64');
        fs.writeFile('/tmp/rick.jpg', data, 'binary', function(err){
            if (err){
                console.log(err);
            } else {
                resemble('/tmp/rick.jpg').onComplete(function(data){
                    console.log(data);
                })
            }
        })
      }
  });
}