import mysql, { Connection, MysqlError } from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection: Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err: MysqlError) => {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

export default connection;