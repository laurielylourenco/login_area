const BD = require('./Database.js');
//
module.exports= class Login extends BD {

    constructor(email,senha) {
         super();
       
        this.email = email;
        this.senha = senha;
    }


   async login() {

        try{
       // console.log( await this.email);
        //console.log( await this.senha);
        var login_user = await this.conn.any('SELECT email,senha FROM  public.code_login WHERE email = $1 AND senha = $2', [ this.email, this.senha]);
        //console.log(await login_user);
      
        if(login_user[0]){
            
            return await  "0";
        }else{

            return await "1";
        }
        }catch(error){
            console.log( await "Erro no login");
            console.log(await error);

        }
  
    }

    async registrar() {

     	var login_user = await this.conn.any('SELECT email FROM  code_login WHERE email = $1', [ this.email]);
           //console.log(await login_user);
            	//console.log(this.email);
  		if(login_user[0]){
        	//console.log(await "0 ")
         return await  "0";
        }else{

 			try{
                await this.conn.any('INSERT INTO public.code_login (email,senha)  VALUES ($1,$2)', [this.email,this.senha]);
            		
            	return await "1";
            }catch(error){
            	
            	console.log( await "Entra aqui 2");
                var log = {
                    msg_error: "Error: Ao criar registrar os dados do usuario",
                    code: error
                }
                return await log;
            }
        }   
    }
}






