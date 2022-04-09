const express = require("express");
const router = express.Router();
const conn = require('../database/database.js');
const middleware = require("../middleware/loginMiddleware.js")
const axios = require('axios');
const bcryptjs = require("bcryptjs");
require('dotenv').config();

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;



router.get('/', (req, res) => {

res.render("login", {id: clientId,status: "ini"})
});

router.post('/login', async (req,res) => {

    const {email,senha } = req.body;
   var result = await conn.any('SELECT * FROM  public.code_login WHERE email = $1', [email]);
    
  
    if(result[0] == null || result == []){
        res.render('login',{status : "error", error: "Esse email não existe!", id:clientId});

    }else{
        var correct  = bcryptjs.compareSync(senha,result[0].senha);
        if(correct){
              req.session.user = {
                id : result[0].id,
                email: result[0].email
            }
                console.log("_____________________________")
                console.log(req.session.user)
             res.render("home")
        }else{

            return res.render('login',{status : "error", error: "Senha errada",id:clientId});
        }
    }

});


router.get('/registrar', (req,res) =>{

    res.render("register", {id: clientId,status: "ini"})
});

router.get('/recuperar', (req,res) =>{

    res.render("forget_password", {status: "ini"})
});

router.post('/recover_password', async (req,res) =>{
    const {email } = req.body;

    console.log(email);

});

router.post('/register', async (req,res) =>{

    const {email,senha } = req.body;

    var result = await conn.any('SELECT * FROM  public.code_login WHERE email = $1', [email]);
     console.log(email)
      console.log(result)
    if(result[0] == null || result == []){
          var salt = bcryptjs.genSaltSync(10);
        var hash = bcryptjs.hashSync(senha,salt);
        await conn.any('INSERT INTO public.code_login (email,senha)  VALUES ($1,$2)', [email,hash]);

        res.render('register',{status : "success", success: "Usuario criado. Vá para pagina de login"})
    }else{
      res.render('register',{status : "error", error: "Esse email já existe"})
    }

});



router.get('/home', middleware, (req, res) => {

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
