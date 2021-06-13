'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const bodyParser = require('body-parser');
const path = require("path");
const formidable = require("formidable");
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

//set 8mb max file size
const maxSize = 8 * 1024 * 1024;

app.engine('pug', require('pug').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//add other middleware
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
app.use(morgan('dev'));

var tempOwnerName = "";
var tempBusinessName = "";
var tempBusinessType = "";
var tempBusinessDesc = "";
var tempImagePath = "";
var tempBusinessLoc = "";
var tempBusinessPrice = "";

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    });
});

app.get('/tourist', (req, res) => {

    //Variable to store object filled with translation pairs
    let translations;

    //Check if a query has been requested
    if (req.query.search !== undefined && req.query.search !== "") {
        translations = searchTranslations(req.query.search.toLowerCase());
    } else {
        translations = getTranslations();
    }

    //Render tourist view with the requested translations (default is all)
    res.render('tourist', {
        title: 'Tourists',
        translations: translations
    });
});

app.get('/hottest', (req, res) => {
    res.render('hottest', {
        title: 'Hottest',
    });
});

app.get('/business', (req, res) => {
    //Pass Category variable and uncomment below once filters/dropdown setup on page
    //var category;
    //try {
    //    let olddata = fs.readFileSync('business.json', 'utf8')
    //    olddata = JSON.parse(olddata);
    //    for (let i = 0; i < olddata.Businesses.Categories.length; i++) {
    //    if (olddata.Businesses.Categories[i].Category.CategoryName == category) {
    //            console.log(olddata.Businesses.Categories[i].Category.CategoryData);
    //        }
    //    }
    //    olddata = JSON.stringify(olddata);
    //} catch (err) {
    //    console.log(err);
    //}
    //convert array of objects into readable format
    //add to res.render below

    res.render('business', {
        title: 'Business',
        businesses: getAllBusinesses()
    })
});

app.get('/attractions', (req, res) => {
    res.render('attractions', {
        title: 'Attractions',
        attractions: getAttractions()
    });
});

app.get('/explore', (req, res) => {
    res.render('explore', {
        title: 'Explore'
    })
});

app.get('/hotels', (req, res) => {
    res.render('hotels', {
        title: 'Hotels',
        hotels: getHotels()
    });
});

app.get('/contacts', (req, res) => {
    res.render('contacts', {
        title: 'Contacts',
    });
});

app.get('/localBusiness', (req, res) => {
    res.render('localBusiness', {
        title: 'Local Business',
    });
});

app.post('/localBusiness', (req, res) => {
});

app.get('/upload', (req, res) => {
    res.render('upload', {
        title: 'Upload',
    });
});

app.post("/upload", (req, res) => {
    tempOwnerName = req.body.ownersName;
    tempBusinessName = req.body.businessName;
    tempBusinessType = req.body.businessType;
    tempBusinessDesc = req.body.businessDesc;
    tempBusinessLoc = req.body.businessLoc;
    tempBusinessPrice = req.body.businessPrice;
    tempImagePath = '../public/uploadedImages/' + tempBusinessName

    //console.log(ownersName + businessName + businessType + businessDesc);
});

app.post("/uploadImage", (req, res) => {
    const form = new formidable.IncomingForm();
    var extension = "";
    form.parse(req, function (err, fields, files) {
        var oldPath = files.uploadImage.path;
        extension = files.uploadImage.name;
        extension = extension.split(".")[1];
        tempImagePath = tempImagePath + "." + extension
        console.log("EXT: " + extension)
        if(extension !== "jpeg" && extension !== "gif" && extension !== "png" && extension !== "webp" && extension !== "apng" && extension !== "pdf" && extension !== "xbm" && extension !== "bmp" && extension !== "ico" && extension !== "tiff"){
            console.log("wrong file type");
            res.send("Wrong File Type");
            return;
        }
        var newPath = path.join(__dirname, 'public/uploadedImages/' + tempBusinessName) + "." + extension;
        var rawData = fs.readFileSync(oldPath);
        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err);
            //return res.render("upload", {
            //    title: "Successfully Added Business"
            //});
        })
        console.log("EXT: " + extension)
        const business = {
            "Owners_Name": tempOwnerName,
            "Business_Name": tempBusinessName,
            "Business_Type": tempBusinessType,
            "Business_Desc": tempBusinessDesc,
            "Business_Location": tempBusinessLoc,
            "Business_Price": tempBusinessPrice,
            "Image_Src": tempImagePath
        };

        try {
            let olddata = fs.readFileSync('business.json', 'utf8')
            olddata = JSON.parse(olddata);
            for (let i = 0; i < olddata.Businesses.Categories.length; i++) {
                if (olddata.Businesses.Categories[i].Category.CategoryName === tempBusinessType) {
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
    })

});

app.get('rating',(req, res)=>{
    //DO SOMETHING WITH RATED HERE
    //getAllRated();
})



app.post('/rating', (req, res)=>{
    //get data from page
    var businessName = req.body.businessName;
    var businessType = req.body.businessType;
    var businessDesc = req.body.businessDesc;
    var businessLoc = req.body.businessLoc;
    var businessPrice = req.body.businessPrice;

    //get rating values
    let ratingCount = 0;
    let businessRating = 0;

    const fs = require('fs')
    fs.readFile('./business.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const oldData = JSON.parse(jsonString)
            for (let i = 0; i < olddata.Businesses.Ratings.length; i++) {
                for (let j = 0; j < olddata.Businesses.Ratings.length; j++) {
                    if (oldData.Ratings.Ratings[i].Rating.CategoryData[j].Business_Name === businessName) {
                        //get old data and populate vars
                        businessRating = parseInt(oldData.Ratings.Ratings[i].Rating.RatingNumber);
                        ratingCount = parseInt(oldData.Ratings.Ratings[i].CategoryData[j].Rating_Count);
                    }
                }
            }
            console.log()
        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })

    //get new rating from page
    var newBusinessRating = req.body.businessRating;

    console.log(req);
    var businessRated = {
        "Business_Name": businessName,
        "Business_Type": businessType,
        "Business_Desc": businessDesc,
        "Business_Location" : businessLoc,
        "Business_Price" : businessPrice,
        "Business_Rating" : businessRating,
        "Rating_Count" : ratingCount,
    }
    let olddata = fs.readFileSync('business.json', 'utf8')
    olddata = JSON.parse(olddata);

    //removes entry if present in different rating group now
    for (let i = 0; i < olddata.Businesses.Ratings.length; i++) {
        for (let j = 0; j < olddata.Businesses.Ratings.length; j++) {
            if (oldData.Businesses.Ratings[i].Rating.CategoryData[j].Business_Name === businessName) {
                olddata.Businesses.Ratings[i].Rating.RatingNumber.pop(businessRated);
            }
        }
    }

    //calculate new average rating
    businessRating = ((businessRating*ratingCount) + newBusinessRating) / ratingCount;
    businessRated = {
        "Business_Name": businessName,
        "Business_Type": businessType,
        "Business_Desc": businessDesc,
        "Business_Location" : businessLoc,
        "Business_Price" : businessPrice,
        "Business_Rating" : businessRating,
        "Rating_Count" : ratingCount,
    }

    for (let i = 0; i < olddata.Businesses.Categories.length; i++) {
        if (olddata.Businesses.Ratings[i].Rating.RatingNumber == businessRating.round()) {
            olddata.Businesses.Ratings[i].Rating.RatingNumber.push(businessRated);
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
});

//Method to get all translations stored in a JSON object
function getTranslations() {
    let rawData = fs.readFileSync('public/scripts/translations.json');
    let translations = JSON.parse(rawData).translations;
    let resultTranslations = {"translations": []};
    for (let i = 0; i < translations.length; i++) {
        if (i % 2 === 0) {
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
        if (item.english.toLowerCase() === query) {
            return item.english.toLowerCase() === query;
        } else if (item.spanish.toLowerCase() === query) {
            return item.spanish.toLowerCase() === query;
        }
    });

    //Resort to imperfect match if no perfect match found
    if (results.length === 0) {
        for (let i = 0; i < translations.length; i++) {
            let item = translations[i];
            if (item.english.toLowerCase().includes(query) || item.spanish.toLowerCase().includes(query)) {
                results.push(item);
            }
        }
    }

    if (results.length === 0) {
        results.push({"catagory": "", "english": "No Results", "spanish": "No Hay Resultados"})
    }

    return results;
}

//Method to get a list of all attractions
function getAttractions() {
    let rawData = fs.readFileSync('business.json');
    let businesses = JSON.parse(rawData).Businesses;
    let results = [];

    for (let i = 0; i < businesses.Categories.length; i++) {
        if (businesses.Categories[i].Category.CategoryName == "Cosas para hacer") {
            for (let j = 0; j < businesses.Categories[i].Category.CategoryData.length; j++) {
                results.push(businesses.Categories[i].Category.CategoryData[j]);
            }
        }
    }
    return results;
}

function getHotels() {
    let rawData = fs.readFileSync('business.json');
    let businesses = JSON.parse(rawData).Businesses;
    let results = [];

    for (let i = 0; i < businesses.Categories.length; i++) {
        if (businesses.Categories[i].Category.CategoryName == "Hoteles") {
            for (let j = 0; j < businesses.Categories[i].Category.CategoryData.length; j++) {
                results.push(businesses.Categories[i].Category.CategoryData[j]);
            }
        }
    }
    return results;
}

function getAllBusinesses() {
    let rawData = fs.readFileSync('business.json');
    let businesses = JSON.parse(rawData).Businesses;
    let results = [];

    for (let i = 0; i < businesses.Categories.length; i++) {
        for (let j = 0; j < businesses.Categories[i].Category.CategoryData.length; j++) {
            results.push(businesses.Categories[i].Category.CategoryData[j]);
        }
    }
    return results;
}

function getAllRated(){
    let rawData = fs.readFileSync('business.json');
    let businesses= JSON.parse(rawData).businesses;
    let results = [];

    for(let i=5; i>-1; i--){
        for(let j = 0; j < businesses.Ratings[i].Rating.CategoryData.length; j++){
            results.push(businesses.Ratings[i].Rating.CategoryData[j]);
        }
    }
    return results;
}

app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});
