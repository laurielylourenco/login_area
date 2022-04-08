const express = require('express')
app =  express();
const http = require('http').createServer(app);
const LoginController = require('./login/loginController.js');
const axios = require('axios');

const nodemon = require('nodemon');
var bodyParser = require('body-parser');
require('dotenv').config();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))
app.use("/js",express.static(__dirname+"./public/js" ));



app.use("/", LoginController);

http.listen(4500, () => {
    console.log('listening on *:4500');
});