var resemble   = require("node-resemble-js");

module.exports.verify = function(req, res){
    var picture = req.body.userPic.replace("data:image/jpeg;base64,", "");
    var userFile = new Buffer(picture, 'base64');
    
    var diff = resemble(userFile).onComplete(function(data){
        console.log(data);
    })
    
    /*
            var diff = resemble(testFile).compareTo(newUserImage).ignoreAntialiasing().onComplete(function(data){
            var matchPercentage = 100 - parseInt(data.misMatchPercentage);
            res.json({match: matchPercentage});

    

    //Dummy Test.... For now
   
    
    /*
    
    When OpenCV gets placed on the server.

    cv.readImage(userFile, function(err, img){
        console.log(img);
        cv.readImage(testFile, function(err, img2){
            console.log(img2);
            cv.ImageSimilarity(img, img2, function(err, dis){
                console.log("Images are off by " + dis);
                var matchPercentage = 100 - dis;
                res.json({match: matchPercentage});
            })
        })
    });
    */
    
   
    
}