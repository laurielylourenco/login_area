const axios = require('axios');

module.exports = class LoginAPI {

	constructor(){
	    this.clientSecret = 'f328de2fec84162642b7';
	    this.clientID = '1c02170f6d257d80c121563a0ddc257eae2da18a';
	}

/*
	async autenticarGithub(code){

		try{
			const  body = {
			    client_id: '1c02170f6d257d80c121563a0ddc257eae2da18a',
			    client_secret: 'f328de2fec84162642b7',
			    code: code
			};
  			const opts = { headers: { accept: 'application/json' }}
	
  			var response = await axios.post(`https://github.com/login/oauth/access_token`, body, opts);




  			return  response.data;
		}catch(error){

			console.log(await "Caiu no catch");
			console.log(await error);

			return await 1;
		}	
	}
*/
	async autenticarGithub(code){

		try{
			const  body = {
			    client_id: '1c02170f6d257d80c121563a0ddc257eae2da18a',
			    client_secret: 'f328de2fec84162642b7',
			    code: code
			};
  			const opts = {method: 'POST', body: body, headers: { accept: 'application/json' }}
	
  			
  			var res = await fetch('https://github.com/login/oauth/access_token', opts) 

  			return  res.data;
		}catch(error){

			console.log(await "Caiu no catch");
			console.log(await error);

			return await 1;
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

	    	console.log( await error);
	    	return await 1;
  		}
  		
	}

}