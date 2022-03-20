const Login = require('../model/Login.js');
const axios = require('axios');
require('dotenv').config();

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;



async function autenticarLogin(req,res){
 var dados =  JSON.parse(JSON.stringify(req.body));
   var usuario =  new Login(dados.email, dados.senha);
   
        let resp = await usuario.login();
        var front = '';

        if(resp == 0){

            res.redirect("/")        
        }else{

             front = {
            msg: "Bem vindo HOME",
            view : "home",
            error : 0,
            tipo : 'Login',
            title: "Logar"
          }
           res.render(front.view, {msg : front.msg, error: front.error, tipo: front.tipo, title : front.title,id : clientId })
        } 
}

function autetincarGithub(req,res){

	const body = { client_id: clientId, client_secret: clientSecret, code: req.query.code };
    const opts = { headers: { accept: 'application/json' } }

    axios.post(`https://github.com/login/oauth/access_token`, body, opts)
        .then(function(res){
        
        let hd = { headers: { accept: 'application/json', "Authorization": `token ${res.data.access_token}`}};

        axios.get("https://api.github.com/user",hd)
        .then(function(res){
            console.log("Resposta do get");
            console.log(res.data);
            
            res.render('home',{ title: "Home do site", tipo: "API"});
        }).catch(err => console.log(err));


    }).catch(err => res.status(500).json({ message: err.message }));

 	
}


async function registrarUsuario(req,res){

        var dados =  JSON.parse(JSON.stringify(req.body));

        var usuario = new Login(dados.email,dados.senha);
        let resp = await usuario.registrar();

        
        var front;
        if(resp == 0){
           

           res.redirect("/")      
        }else{

          front = {
            msg: "Bem vindo HOME",
            view : "home",
            error : 0,
            tipo : 'Login'
          }

           res.render(front.view, {msg : front.msg, error: front.error, tipo: front.tipo, title : front.title }) 
        }

    
}


module.exports = {autetincarGithub,autenticarLogin, registrarUsuario}