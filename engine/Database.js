const pgp = require('pg-promise')({});


  module.exports = class BD {

    constructor(){

        this.cn = {
            host: '',
            database: '',
            user: '',
            password: ''
        }
        
        this.conn = pgp(this.cn);
 
    }

}





 