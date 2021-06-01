'use strict';

const express = require('express');
const app = express();
app.engine('pug', require('pug').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', (req, res)=>{res.render('index', {
    title: 'Home'
})});
app.listen(process.env.PORT || 8080, ()=>{console.log("Express server listening on port %d in %s mode",
    "7", app.settings.env)});