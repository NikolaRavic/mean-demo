var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var public_root = '../app',
    image_root = '/images';

app.use(express.static(public_root));

app.get('/get-all-images', function (req, res) {
    var allImages = getImages(public_root + image_root);
    res.send(JSON.stringify(allImages));
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});

//function recursively return files with relative path (starting from 'images/...' and excluding 'archive' folder)

function getImages(dir, images) {
    var images = images || [];
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (file =='archive') return;
        var name = dir + '/' + file;
        if(fs.statSync(name).isDirectory()){
            getImages(name, images);
        } else{
            images.push(name.substr(7));
        }
    });
    return images;
};