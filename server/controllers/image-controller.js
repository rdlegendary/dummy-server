var resemble   = require("node-resemble-js");
var cloudinary = require('cloudinary');
var fs         = require('fs-extra');
var request    = require('request').defaults({ encoding: 'base64' });
var tmp        = require('tmp');
var Image      = require('../datasets/images.js');

module.exports.verify = function(req, res){
    var userImage = req.files.file;
    Image.findOne().sort({date: -1}).exec(function(err, image){
        if (err){
            res.status(500);
            res.send();
            return;
        }
        //Send the Image
        compareImages(userImage.path, image.url, function(data){
                   console.log(data);
                   var matchPercentage = 100 - parseInt(data.misMatchPercentage);
                   console.log(matchPercentage);
                   res.json({match: matchPercentage});
        })          
    })
}

module.exports.updateValidationImage = function(req, res){
    
//Upload Files To a Third Party
var newImage   =   req.files.file.path;
cloudinary.uploader.upload(newImage, function(result) { 
   var image     = new Image();
       image.url = result.url;
       image.save();
       res.status(200);
       res.send();
}, {image_metadata: true});
 
}

module.exports.getLastImage = function(req, res){
    Image.findOne().sort({date: -1}).exec(function(err, image){
        if (err){
            res.status(500);
            res.send();
            return;
        }
        //Send the Image
        res.json(image);
    })
}

function compareImages(file, url, cb){
 request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        data = new Buffer(body, 'base64');
        fs.writeFile('/tmp/test.jpg', data, 'binary', function(err){
            if (err){
                console.log(err);
            } else {
                var diff = resemble(file).compareTo('/tmp/test.jpg').ignoreAntialiasing().onComplete(function(data){
                cb(data);
            });
            }
        })
      }
  });
}