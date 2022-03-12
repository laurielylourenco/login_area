const express = require('express')
app =  express();
const http = require('http').createServer(app);
const axios = require('axios');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))
const LoginAPI = require('./engine/LoginAPI.js');
const Login = require('./engine/Login.js');
const nodemon = require('nodemon');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const clientId = '';
const clientSecret = '';




app.get('/', (req, res) => {

    //res.redirect('http://localhost:4500/login');

 res.render('login',{ title: "Funcionou", message: null, id : clientId, error: 0});
});


app.post('/login', (req,res) =>{

   // console.log(req);
    
var dados = JSON.stringify(req.body);
var usuario = new Login(dados);
(async () => {
    
   
    let resp = await usuario.login();
    var front;
    if(resp == 1){
        front = {
            msg: "Usuario não possui cadastro",
            view: "login",
            error: 1, 
            tipo : 'Login'

        }
      //  res.redirect('/login', );
       // 
    }else{
      front = {
        msg: "Bem vindo HOME",
        view : "home",
        error : 0,
        tipo : 'Login'
      }

      //res.render(front.view, {msg : front.msg, error: front.error, tipo: 'Login' })
    }

        res.render(front.view, {msg : front.msg, error: front.error, tipo: front.tipo })
    
})()    
});


app.get('/registrar', (req,res) =>{

    res.render('register');

});

app.post('/register', (req,res) =>{

var dados = JSON.stringify(req.body);
var usuario = new Login(dados);

console.log(dados);
(async () => {
    let resp = await usuario.registrar();

    console.log(resp);
    var front;
    if(resp == 1){
        front = {
            msg: "Usuario já possui cadastro",
            view: "register",
            error: 1, 
            tipo : 'Login'

        }
      //  res.redirect('/login', );
    //res.render(front.view, {msg : front.msg, error: front.error, tipo: 'Login' })
    }else{

      front = {
        msg: "Bem vindo HOME",
        view : "home",
        error : 0,
        tipo : 'Login'
      }

      //res.render(front.view, {msg : front.msg, error: front.error, tipo: 'Login' })
    }

        res.render(front.view, {msg : front.msg, error: front.error, tipo: front.tipo })
    
})() 

});

app.get('/home', (req, res) => {

    const body = { client_id: clientId, client_secret: clientSecret, code: req.query.code };
    const opts = { headers: { accept: 'application/json' } }

    axios.post(`https://github.com/login/oauth/access_token`, body, opts)
        .then(function(res){
        
        let hd = { headers: { accept: 'application/json', "Authorization": `token ${res.data.access_token}`}};

        axios.get("https://api.github.com/user",hd)
        .then(function(res){
            console.log("Resposta do get");
            console.log(res.data);
        }).catch(err => console.log(err));


    }).catch(err => res.status(500).json({ message: err.message }));

 res.render('home',{ title: "Home do site", tipo: "API"});

});






http.listen(4500, () => {
    console.log('listening on *:4500');
});