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

let tempName = "";

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
        businesses: getAllRated()
    });
});

app.get('/business', (req, res) => {

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
    const ownersName = req.body.ownersName;
    const businessName = req.body.businessName;
    const businessType = req.body.businessType;
    const businessDesc = req.body.businessDesc;
    const businessLoc = req.body.businessLoc;
    const businessPrice = req.body.businessPrice;
    tempName = businessName;

    console.log(ownersName + businessName + businessType + businessDesc);

    const business = {
        "Owners_Name": ownersName,
        "Business_Name": businessName,
        "Business_Type": businessType,
        "Business_Desc": businessDesc,
        "Business_Location": businessLoc,
        "Business_Price": businessPrice,
        "Image_Src": '../public/uploadedImages/' + businessName + ".png"
    };

    try {
        let olddata = fs.readFileSync('business.json', 'utf8')
        olddata = JSON.parse(olddata);
        for (let i = 0; i < olddata.Businesses.Categories.length; i++) {
            if (olddata.Businesses.Categories[i].Category.CategoryName === businessType) {
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
});

app.post("/uploadImage", (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldPath = files.uploadImage.path;
        var extension = files.uploadImage.name.split(".")
        if(extension[1] !== "png"){
            console.log("wrong file type");
            return;
        }
        var newPath = path.join(__dirname, 'public/uploadedImages') + '/' + tempName + "." + extension[1];
        var rawData = fs.readFileSync(oldPath);
        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err);
            //return res.render("upload", {
            //    title: "Successfully Added Business"
            //});
        })
    })
    try {
        let olddata = fs.readFileSync('business.json', 'utf8')
        olddata = JSON.parse(olddata);
        for (let i = 0; i < olddata.Businesses.Categories.length; i++) {
            for (let j = 0; j < olddata.Businesses.Categories[i].Category.CategoryData[j]; j++) {
                if (olddata.Businesses.Categories[i].Category.CategoryData[j].Business_Name === tempName) {
                    olddata.Businesses.Categories[i].Category.CategoryData[j].Image_Src = newPath;
                }
            }
        }
        console.log(olddata);
        const data = JSON.stringify(olddata);

        fs.writeFile("business.json", data, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON saved");
            setTimeout(() => {
                res.redirect('/business');
            }, 5000)
        })
    } catch (err) {
        console.log(err);
    }
});

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
    let olddata2 = fs.readFileSync('business.json', 'utf8')
    olddata2 = JSON.parse(olddata2);
    for (let i = 0; i < olddata2.Businesses.Ratings.length; i++) {
        for (let j = 0; j < olddata2.Businesses.Ratings.length; j++) {

            if(olddata2.Businesses.Ratings[i].Rating.CategoryData.length !== 0){
                if (olddata2.Businesses.Ratings[i].Rating.CategoryData[j].Business_Name === businessName) {
                    //get old data and populate vars
                    businessRating = parseInt(olddata2.Businesses.Ratings[i].Rating.RatingNumber);
                    ratingCount = parseInt(olddata2.Businesses.Ratings[i].Rating.CategoryData[j].Rating_Count);
                }
            }
            else{
                businessRating = 0;
                ratingCount = 0;
            }

        }
    }

    //get new rating from page
    var newBusinessRating = req.body.businessRating;
    ratingCount += 1;

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
            if(olddata.Businesses.Ratings[i].Rating.CategoryData.length !== 0){
                if (olddata.Businesses.Ratings[i].Rating.CategoryData[j].Business_Name === businessName) {
                    olddata.Businesses.Ratings[i].Rating.RatingNumber.pop(businessRated);
                }
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
        if (olddata.Businesses.Ratings[i].Rating.RatingNumber == Math.round(businessRating)) {
            olddata.Businesses.Ratings[i].Rating.CategoryData.push(businessRated);
        }
    }
    console.log(olddata);
    const data = JSON.stringify(olddata);

    fs.writeFile("business.json", data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON saved");
        res.redirect('/business');
    })
});

//Method to get all translations stored in a JSON object
function getTranslations() {
    let rawData = fs.readFileSync('public/scripts/translations.json');
    let translations = JSON.parse(rawData).translations;
    let resultTranslations = {"translations": []};
    for (let i = 0; i < translations.length; i++) {
        if (i % 3 === 0) {
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


//Method to get a list of all business
function getAllBusiness() {
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
    let businesses = JSON.parse(rawData).Businesses;
    let results = [];

    for(let i=5; i>-1; i--){
        for(let j = 0; j < businesses.Ratings[i].Rating.CategoryData.length; j++){
            let Rating = businesses.Ratings[i].Rating.RatingNumber;
            let x = {
                "Business_Name": businesses.Ratings[i].Rating.CategoryData.Business_Name,
                "Business_Type": businesses.Ratings[i].Rating.CategoryData.Business_Type,
                "Business_Desc": businesses.Ratings[i].Rating.CategoryData.Business_Desc,
                "Business_Location": businesses.Ratings[i].Rating.CategoryData.Business_Location,
                "Business_Price": businesses.Ratings[i].Rating.CategoryData.Business_Price,
                "Rating_Count": businesses.Ratings[i].Rating.CategoryData.Rating_Count,
                "Rating": Rating
            }
            results.push(x);
        }
    }
    return results;
}

app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});
