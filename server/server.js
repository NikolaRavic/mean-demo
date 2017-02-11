var express = require('express');
var cool = require('cool-ascii-faces');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var image = require('./models/images');
var fs = require('fs');
var path = require('path');
var public_root = '../app',
    image_root = '../app/images';

mongoose.connect('mongodb://nik0la:n12345@ds149489.mlab.com:49489/heroku_09pzbvw6');
var Image = mongoose.model('Image');

app.set('port', (process.env.PORT || 5000));

// initial reading from images folder and saving to database

let allImages = getImages(image_root);
var id = 0;
allImages.forEach(function (image) {

    var img = new Image({
        id: id++,
        folder: image,
        archive: "",
        points: Math.floor(Math.random() * 1000 + 1) //initial points = random number between 1 and 1000 (only archived has zero points)
    });
    img.save(function (err, im) {
        if (err) {
            console.log(err);
        } else {
            // console.log(im);
        }
    })
});

//expose public folder
app.use(express.static(public_root));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/cool', function (request, response) {
    response.send(cool());
});

//fetches all image models
app.get('/get-all-images', function (req, res) {
    Image.find(function (err, images) {
        if (err) {
            console.log(err);
        } else {
            res.json(images);
        }
    });
});

app.post('/delete-image', function (req, res) {

    let image = req.body.params.image.folder;
    let id_img = req.body.params.image.id;
    var img_root = image_root + '/archive/' + path.basename(image);

    fs.rename(public_root + '/' + image, img_root, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            Image.findOneAndUpdate({id: id_img}, {
                $set: {
                    archive: 'images/archive/' + path.basename(image),
                    points: 0
                }
            }, {new: true}, function (err, img1) {
                if (err) {
                    console.log(err);
                } else {

                    Image.find({id: {$lt: id_img}, $and: [{archive: {$eq: ""}}]}, function (err, data) {

                        data.forEach(function (img) {
                            //incrementing all models that are not in archive points properties
                            img.update({$inc: {points: 1}}, {new: true}, function (err, data) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        });
                        //returns updated image model
                        res.json(img1);
                    });
                }
            });
            console.log("Image " + image + " moved to archive folder!", "index: " + id_img);
        }
    });
});

app.listen(app.get('port'), function () {
    console.log("Server running on port " + app.get('port'));
});

//function recursively return files with relative path (starting from 'images/...' and excluding 'archive' folder)

function getImages(dir, images) {
    var images = images || [];
    let files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (file == 'archive') return;
        let name = dir + '/' + file;
        if (fs.statSync(name).isDirectory()) {
            getImages(name, images);
        } else {
            images.push(name.substr(4));
        }
    });
    return images;
}