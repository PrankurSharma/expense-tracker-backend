const mysql = require('mysql');
mysql.createPool({
	host: 'remotemysql.com',
	user: 'pxj9TA5JSf',
	password: '7jbkU8hT5u',
	database: 'pxj9TA5JSf',
});
module.exports = db;