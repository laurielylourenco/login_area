const express = require("express");
const router = express.Router();
const conn = require('../database/database.js');
const axios = require('axios');

require('dotenv').config();

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;



router.get('/', (req, res) => {

//res.sendFile("login.html",{root : "./views/"});

res.render("login", {id: clientId,status: "ini"})
});

router.post('/login', async (req,res) => {

    const {email,senha } = req.body;
   var result = await conn.any('SELECT * FROM  public.code_login WHERE email = $1', [email]);
    
  
    if(result[0] == null || result == []){
        res.render('login',{status : "error", error: "Esse email não existe!", id:clientId});

    }else{
        if(senha != result[0].senha){
          return res.render('login',{status : "error", error: "Senha errada",id:clientId});

        }else{
             res.render("home")
        }
    }

});


router.get('/registrar', (req,res) =>{

    //res.sendFile("register.html",{root : "./views/"});

    res.render("register", {id: clientId,status: "ini"})
});

router.post('/register', async (req,res) =>{

    const {email,senha } = req.body;

    var result = await conn.any('SELECT * FROM  public.code_login WHERE email = $1', [email]);
     
    if(result[0] == null || result == []){
           // if(err)  throw err;
            res.render('register',{status : "error", error: "Esse email já existe"})


    }else{
        await conn.any('INSERT INTO public.code_login (email,senha)  VALUES ($1,$2)', [email,senha]);

        res.render('register',{status : "success", success: "Usuario criado. Vá para pagina de login"})
    }

});



router.get('/home', (req, res) => {

   res.render('home');
  
});


router.get('/auth_github', (req, res) => {


const body = { client_id: clientId, client_secret: clientSecret, code: req.query.code };
    const opts = { headers: { accept: 'application/json' } }

    axios.post(`https://github.com/login/oauth/access_token`, body, opts)
        .then(function(resp){
            let hd = { headers: { accept: 'application/json', "Authorization": `token ${resp.data.access_token}`}};

            axios.get("https://api.github.com/user",hd)
            .then(function(resp){
               res.render("home")
            })
            .catch(err => console.log(err));
        })
        .catch(err => res.status(500).json({ message: err.message }));


});


module.exports = router;
