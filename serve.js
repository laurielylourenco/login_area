const express = require('express')
app =  express();
const http = require('http').createServer(app);
const axios = require('axios');
const Login = require('./controller/loginController.js');
const nodemon = require('nodemon');
var bodyParser = require('body-parser');
require('dotenv').config();

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))


app.get('/', (req, res) => {


 res.render('login',{ title: "Funcionou", message: null, id : clientId, error: 0});

});



app.post('/login', (req,res) => {
    Login.autenticarLogin(req,res);
});


app.get('/registrar', (req,res) =>{

    res.render('register');

});

app.post('/register', (req,res) =>{

   Login.registrarUsuario(req,res)
});

app.get('/home', (req, res) => {

    Login.autetincarGithub(req,res)

});


http.listen(4500, () => {
    console.log('listening on *:4500');
});