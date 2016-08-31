var resemble   = require("node-resemble-js");

module.exports.verify = function(req, res){
    var userImage = req.files.file;
    var testFile  = global.absolutePath + '/images/test11.jpg';
        
            var diff = resemble(userImage.path).compareTo(testFile).ignoreAntialiasing().onComplete(function(data){
                 var matchPercentage = 100 - parseInt(data.misMatchPercentage);
                 res.json({match: matchPercentage});
            });
    
}