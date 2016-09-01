var resemble   = require("node-resemble-js");

module.exports.verify = function(req, res){
    var userImage = req.files.file;
    var testFile  = global.absolutePath + '/images/test12.jpg';
        
            var diff = resemble(userImage.path).compareTo(testFile).ignoreColors().onComplete(function(data){
                 var matchPercentage = 100 - parseInt(data.misMatchPercentage);
                   console.log(matchPercentage);
                   res.json({match: matchPercentage});
            });
    
}