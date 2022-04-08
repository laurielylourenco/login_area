const pgp = require('pg-promise')({});
require('dotenv').config();


const cn = {
    host:  process.env.HOST,
    database:  process.env.DATABASE,
    user:  process.env.USER_DB,
    password:  process.env.PASSWORD
};


const conn = pgp(cn); // database instance;


module.exports = conn