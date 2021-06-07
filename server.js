//https://attacomsian.com/blog/uploading-files-nodejs-express

'use strict';

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var formidable = require("formidable");
var cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
app.engine('pug', require('pug').__express);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 8 * 1024 * 1024 * 1024 //8MB max file(s) size
    },
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
});


app.get('/localBusiness', (req, res) => {
    res.render('localBusiness', {
        title: 'Local Business'
    })
});


app.post('/localBusiness', (req, res) => {
});

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let imageUpload = req.files.imageUpload;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            imageUpload.mv('.\\BusinessFiles\\' + imageUpload);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: imageUpload.name,
                    mimetype: imageUpload.mimetype,
                    size: imageUpload.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
    imageUpload.save(function(err, user) {
        if(err) console.log(err);
        return res.send("Success! Your post has been saved.");
    });
});




app.get('/upload', (req, res) => {
     res.render('upload', {
         title: 'Business Image Upload'
     });
    req.fields; // contains non-file fields
    req.files; // contains files
//     const fs = require('fs');
//     const file = './localBusiness.json';
//     //create object from form
//     var OwnersName = req.query.OwnersName;
//     var BusinessName = req.query.BusinessName;
//     var BusinessType = req.query.BusinessType;
//     var BusinessDesc = req.query.BusinessDesc;
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = './/uploaded//';
//       var newpath = String(BusinessName);
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//       });
//     });
//     res.end();
 });


var router = express.Router();
router.post('/upload', (req, res) => {
    var post = new Post(req.body);

    post.save(function(err, user) {
        if(err) console.log(err);
        return res.send("Success! Your post has been saved.");
    });
});

app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});
