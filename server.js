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
    res.render('tourist',  {
        title: 'Tourists',
        translations: getTranslations()
    })
})
app.get('/localBusiness', (req, res) => {
    res.render('localBusiness',  {
        title: 'Local Business',
    })
})
function getTranslations(){
    let translationsList = [];
    let rawData = fs.readFileSync('translations.json');
    let translations = JSON.parse(rawData).translations;
    for(let i =0; i < translations.length; i++){
        let translation = translations[i].english + " : " + translations[i].spanish;
        translationsList.push(translation);
    }
    return translationsList;
}
app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});