'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const bodyParser = require('body-parser');
const path = require("path");
const multer = require('multer');
const upload = multer();
const formidable = require("formidable");
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');


//set 8mb max file size
const maxSize = 8 * 1024 * 1024;

app.engine('pug', require('pug').__express);

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
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
app.use(morgan('dev'));

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
    //pass var for the searched type here
    var category;

    //JSONParser jsonParser = new JSONParser();

    //switch through categories and get objects
    switch (category){
        case "Comidas y bebidas":

            break
        case "Cosas para hacer":

            break

        case "Servicios":

            break
        case "Hoteles":

            break
        case "Compras":

            break
        case "Otra":

            break
        default:

            break
    }
    //convert array of objects into readable format
    //add to res.render below
    res.render('business', {
        title: 'Business'
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
app.post('/localBusiness', (req, res) => {
});

    try {
        let olddata = fs.readFileSync('business.json', 'utf8')
        olddata = JSON.parse(olddata);
        for (let i = 0; i < olddata.Businesses.Categories.length; i++) {
            if (olddata.Businesses.Categories[i].Category.CategoryName == businessType) {
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
        var newPath = path.join(__dirname, 'uploadedImages') + '/' + fields.businessName + "." + extension[1];
        var rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err);
            return res.render("upload", {
                title: "Successfully Added Business"
            });
        })
    })
});

app.post('/rating', (req, res)=>{
    console.log(req);
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


app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});