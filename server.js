'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
const path = require("path");
var formidable = require("formidable");
var cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
app.engine('pug', require('pug').__express);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

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

app.get('/business', (req, res) => {
    res.render('business', {
        title: 'Business'
    })
});

app.get('/explore', (req, res) => {
    res.render('explore', {
        title: 'Explore'
    })
});


app.get('/localBusiness', (req, res) => {
    res.render('localBusiness', {
        title: 'Local Business'
    })
});


//set 8mb max file size
const maxSize = 8 * 1024 * 1024;

app.post('/localBusiness', (req, res) => {
});

app.get('/upload', (req, res) => {
    res.render('upload', {
        title: 'Business Upload'
    });
});

app.post("/upload", (req, res) => {
    var ownersName = req.body.ownersName;
    var businessName = req.body.businessName;
    var businessType = req.body.businessType;
    var businessDesc = req.body.businessDesc;

    console.log(ownersName + businessName + businessType + businessDesc);

    const business = {
        "Owners Name": ownersName,
        "Business Name": businessName,
        "Business Type": businessType,
        "Business Desc": businessDesc
    };

    try{
        let olddata = fs.readFileSync('business.json', 'utf8')
        olddata = JSON.parse(olddata);
        for(let i=0; i<olddata.Businesses.Categories.length; i++){
            if(olddata.Businesses.Categories[i].Category.CategoryName == businessType){
                olddata.Businesses.Categories[i].Category.CategoryData.push(business);
            }
        }
        console.log(olddata);


        const data = JSON.stringify(olddata);

        fs.writeFile("business.json", data, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON saved");
        })
    } catch (err) {
        console.log(err);
    }

    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var oldPath = files.uploadImage.path;
        var extension = files.uploadImage.name.split(".")
        var newPath = path.join(__dirname, 'uploadedImages') + '/' + fields.businessName + "." + extension[1];
        var rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, function (err){
            if(err) console.log(err);
            return res.send("Successful Image Upload");
        })
    })

});

app.listen(3000, function(){
    console.log("server is running on port 3000");
})