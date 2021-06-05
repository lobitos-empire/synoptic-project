'use strict';

const express = require('express');
const app = express();
app.engine('pug', require('pug').__express);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index',  {
        title: 'Home',
    })
});
app.get('/index', (req, res) => {
    res.render('index',  {
        title: 'Home',
    })
});
app.get('/tourist', (req, res) => {
    res.render('tourist',  {
        title: 'Tourists',
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
});
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
app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});