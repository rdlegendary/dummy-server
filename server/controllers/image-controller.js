var resemble   = require("node-resemble-js");
var cloudinary = require('cloudinary');

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
    var newImage   =   req.files.file.path;

//Upload Files To a Third Party
  
cloudinary.uploader.upload(newImage, {image_metadata: true}, function(result) { 
   console.log(result.url);
    resemble(result.url).onComplete(function(data){
        console.log(data);
    });
});
    
}