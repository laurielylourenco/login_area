const axios = require('axios');

module.exports = class LoginAPI {

	constructor(){
		this.clientSecret = '';
		this.clientID = '';
	}

	async autenticarGithub(code){

		try{
			const body = {
			    client_id: this.clientID,
			    client_secret: this.clientSecret,
			    code: code
			};
  			const opts = { headers: { accept: 'application/json' }}
	
  			let response = await axios.post(`https://github.com/login/oauth/access_token`, body, opts);

  			console.log(await response);
  			console.log(await '___________________________________');
  			console.log(await response.data);
  			console.log(await '___________________________________');
  			console.log(await body);


  			return response.data;
		}catch(error){

			console.log(await "Caiu no catch");
			console.log(await error);

			return 1;
		}	
	}

	async getUserGithub(token){

		try {
			let hd = { headers: { accept: 'application/json', "Authorization": `token ${token}`}};
		   	let response = await axios.get("https://api.github.com/user",hd);
		    console.log("Dentro do fnc");
		    console.log(await response);
		    return response.data;
	  	} catch (error) {

	    	console.error(error);
	    	return 1;
  		}
  		
	}

}