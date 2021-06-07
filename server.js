'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
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
    res.render('index',  {
        title: 'Home',
    })
});
app.get('/tourist', (req, res) => {

    //Variable to store object filled with translation pairs
    let translations;

    //Check if a query has been requested
    if(req.query.search !== undefined && req.query.search !== ""){
        translations = searchTranslations(req.query.search.toLowerCase());
    }
    else{
        translations = getTranslations();
    }

    //Render tourist view with the requested translations (default is all)
    res.render('tourist',  {
        title: 'Tourists',
        translations: translations
    })
});
app.get('/hottest', (req, res) => {
    res.render('hottest',  {
        title: 'Hottest',
    })
});
app.get('/attractions', (req, res) => {
    res.render('attractions',  {
        title: 'Attractions',
    })
});
app.get('/hotels', (req, res) => {
    res.render('hotels',  {
        title: 'Hotels',
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

//Method to get all translations stored in a JSON object
function getTranslations(){
    let rawData = fs.readFileSync('public/scripts/translations.json');
    let translations = JSON.parse(rawData).translations;
    let resultTranslations = {"translations": []};
    for(let i = 0; i < translations.length; i++){
        if(i % 2 === 0){
            resultTranslations.translations.push(translations[i]);
        }
    }
    return resultTranslations.translations;
}

//Method to search through translations in the translations.json file based on a query
function searchTranslations(query) {
    let rawData = fs.readFileSync('public/scripts/translations.json');
    let translations = JSON.parse(rawData).translations;
    let results;

    //Try to get a perfect match using the more efficient .filter method
    results = translations.filter((item) => {
        if(item.english.toLowerCase() === query){
            return item.english.toLowerCase() === query;
        }
        else if(item.spanish.toLowerCase() === query){
            return item.spanish.toLowerCase() === query;
        }
    });

    //Resort to imperfect match if no perfect match found
    if(results.length === 0){
        for(let i = 0; i < translations.length; i++){
            let item = translations[i];
            if(item.english.toLowerCase().includes(query) || item.spanish.toLowerCase().includes(query)){
                results.push(item);
            }
        }
    }

    if(results.length === 0){
        results.push({"catagory":"","english":"No Results","spanish":"No Hay Resultados"})
    }

    return results
}

app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});
