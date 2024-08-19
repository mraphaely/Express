import "dotenv/config"
import mysql from "mysql2";

//conexão com o banco
const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MySQL_host,
    user: process.env.MySQL_user,
    password: process.env.MySQL_password, //Sen@iDev77!.
    database: process.env.MySQL_database,
    port: process.env.MySQL_port
});

export default connection;
