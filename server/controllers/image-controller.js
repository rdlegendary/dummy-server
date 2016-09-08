var resemble   = require("node-resemble-js");
var fs         = require("fs-extra");
var path       = require("path");

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
    var targetPath =  global.absolutePath + '/images/test12.jpg';
    
    fs.rename(newImage, targetPath, function(err){
     if (err){
         res.status(500).send('Image Failed to Upload');
         console.log("This Failed ", err);
     } else {
         console.log("this succeeded");
         res.json({'success': true});
     }   
    })
}