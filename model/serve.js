const app = require('express')();
const http = require('http').createServer(app);
const axios = require('axios');
app.set('view engine', 'ejs');
app.set('views', '../views');
const LoginAPI = require('./LoginAPI.js');



const clientId = '';
const clientSecret = '';

app.get('/', (req, res) => {

    res.redirect('http://localhost:4500/login');
});


app.get('/login', (req,res) =>{

     res.render('login',{ title: "Funcionou", message: null, id : clientId});
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