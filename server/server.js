var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var image = require('./models/images');
var fs = require('fs');
var path = require('path');
var public_root = '../app',
    image_root = '../app/images';

mongoose.connect('mongodb://localhost/gallery_db');
var Image = mongoose.model('Image');

let allImages = getImages(image_root);


// reading from file folder and saving to database
//
// allImages.forEach(function (image) {
//     var img = new Image({
//         folder: image,
//         archive: "",
//         points: 0
//     });
//     img.save(function (err, im) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log(im);
//         }
//     })
// });

app.use(express.static(public_root));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/get-all-images', function (req, res) {
    Image.find(function (err, images) {
        if(err) {
            console.log(err);
        } else {
            res.json(images);
        }
    });

    // let allImages = getImages(image_root);
    // res.send(JSON.stringify(allImages));
});

app.post('/delete-image', function (req, res) {

    let image = req.body.params.image.folder;
    let id = req.body.params.image._id;
    var img_root = image_root + '/archive/' + path.basename(image);

    fs.rename(public_root + '/' + image, img_root , function (err) {
        if(err){
            console.log(err);
            res.send(err);
        }else {
            Image.findOneAndUpdate({_id:id}, {$set: {archive: 'images/archive/' + path.basename(image), points: 0}}, {new: true}, function (err, img) {
                if(err) {
                    console.log(err);
                } else {
                    Image.find({_id:{$lt: id}, archive :{$eq: ""}}).update({$inc:{points:1}}).exec();
                    res.json(img);

                }
            });
            console.log("Image " + image + " moved to archive folder!", "index: " + id);
        }
    });
});

app.listen(1337, function () {
    console.log("Server running on port 1337");
});

//function recursively return files with relative path (starting from 'images/...' and excluding 'archive' folder)

function getImages(dir, images) {
    var images = images || [];
    let files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (file =='archive') return;
        let name = dir + '/' + file;
        if(fs.statSync(name).isDirectory()){
            getImages(name, images);
        } else{
            images.push(name.substr(7));
        }
    });
    return images;
}