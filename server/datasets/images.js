var mongoose = require('mongoose');

//This is for the purposes of the demo. Images will be assigned to specific beacons in the future
module.exports = mongoose.model('Image', {
    url: String,
    date: {type: Date, default: Date.now}
});