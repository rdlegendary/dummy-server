var http                = require("http");
var express             = require("express");
//var cv                  = require("opencv");
var multipart           = require("connect-multiparty");
var multipartMiddleware = multipart();
var bodyParser          = require("body-parser");
var resemble            = require("node-resemble-js");
var app                 = express();
var server              = http.createServer(app);
global.absolutePath     = __dirname;


const PORT = process.env.PORT || 5000;
server.listen(PORT, function(){
    console.log("we have a server");
})

//Controllers
var imageController = require('./server/controllers/image-controller.js');

//Usages
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(multipartMiddleware);

//Static Files
app.use('/images', express.static(__dirname + '/images'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

//Endpoints
app.post('/sendPicture', multipartMiddleware, imageController.verify);