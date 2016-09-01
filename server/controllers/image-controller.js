var resemble   = require("node-resemble-js");

module.exports.verify = function(req, res){
    var userImage = req.files.file;
    var testFile  = global.absolutePath + '/images/test12.jpg';
        
            var diff = resemble(testFile).compareTo(userImage.path).onComplete(function(data){
                console.log(data);
                 var matchPercentage = 100 - parseInt(data.misMatchPercentage);
                   console.log(matchPercentage);
                   res.json({match: matchPercentage});
            });
    
}