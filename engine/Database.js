const pgp = require('pg-promise')({});
require('dotenv').config();

  module.exports = class BD {

    constructor(){

        this.cn = {
            host:  process.env.HOST,
            database:  process.env.DATABASE,
            user:  process.env.USER_DB,
            password:  process.env.PASSWORD
        }
        
        this.conn = pgp(this.cn);
 
    }

}





 