'use strict';

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.engine('pug', require('pug').__express);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
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
    const fs = require('fs');
    const file = './localBusiness.json';
    //create object from form
    var OwnersName = req.query.OwnersName;
    var BusinessName = req.query.BusinessName;
    var BusinessType = req.query.BusinessType;
    var BusinessDesc = req.query.BusinessDesc;

});

app.get('/upload', (req, res) => {
    res.render('upload', {
        title: 'Business Image Upload'
    })
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = './uploaded/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
});

app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode",
        this.address().port, app.settings.env)
});
