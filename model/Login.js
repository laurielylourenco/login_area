const BD = require('./Database.js');
//
module.exports = class Login extends BD {

    constructor(email,senha) {
         super();
       
        this.email = email;
        this.senha = senha;
    }


   async login() {

        try{

        var login_user = await this.conn.any('SELECT email,senha FROM  public.code_login WHERE email = $1 AND senha = $2', [ this.email, this.senha]);
      
        if(login_user[0]){
            
            return   "1";
        }else{

            return   "0";
        }
        
        }catch(error){
            console.log( "Erro no login");
            console.log( error);
            return "0"

        }
  
    }

    async registrar() {

     	var login_user =  this.conn.any('SELECT email FROM  code_login WHERE email = $1', [ this.email]);

  		if(login_user[0]){
       
         return "2"; // esse usuario ja existe
        }else{

 			try{
                 this.conn.any('INSERT INTO public.code_login (email,senha)  VALUES ($1,$2)', [this.email,this.senha]);
            		
            	return  "1";
            }catch(error){
            	
                return  "0";
            }
        }   
    }
}






