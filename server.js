'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
app.engine('pug', require('pug').__express);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
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
app.get('/contacts', (req, res) => {
    res.render('contacts',  {
        title: 'Contacts',
    })
});

app.get('/localBusiness', (req, res) => {
    res.render('localBusiness',  {
        title: 'Local Business',
    })
})
app.get('/upload', (req, res) => {
    res.render('upload',  {
        title: 'Upload',
    })
});
app.get('/business', (req, res) => {
    res.render('business',  {
        title: 'Business',
    })
});
app.get('/explore', (req, res) => {
    res.render('explore',  {
        title: 'Explore New Markets',
    })
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