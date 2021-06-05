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
    let translations;

    console.log(req.query.search);

    if(req.query.search !== undefined && req.query.search !== ""){
        translations = searchTranslations(req.query.search.toLowerCase())
    }
    else{
        translations = getTranslations()
    }
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
function getTranslations(){
    let rawData = fs.readFileSync('public/scripts/translations.json');
    return JSON.parse(rawData).translations;
}
function searchTranslations(query) {
    console.log(query);
    let rawData = fs.readFileSync('public/scripts/translations.json');
    let translations = JSON.parse(rawData).translations;

    return translations.filter((item) => {
        return item.english.toLowerCase() === query;
    });
}
app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});