const mysql = require('mysql');
const mysqlStore = require('express-mysql-session')(session);

const options = {
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_USER,
    host: process.env.DB_HOST,
    createDatabaseTable: true
}
const pool = mysql.createPool(options);
const sessionStore = new mysqlStore(options, pool);

module.exports = sessionStore;