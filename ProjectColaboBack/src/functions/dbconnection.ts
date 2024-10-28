import { createConnection, Connection, QueryError } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection: Connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err: QueryError | null) => {
    if (err) {
        return console.error('Error db: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

export default connection;