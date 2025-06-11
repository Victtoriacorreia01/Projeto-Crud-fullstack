const mysql = require('mysql2/promise'); 
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',  // <-- Se for diferente, coloque a correta!
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'jvlm2001',
  database: process.env.DB_NAME || 'Local instance MySQL93'
});



module.exports = connection;
