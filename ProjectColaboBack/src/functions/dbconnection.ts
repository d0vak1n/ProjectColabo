import { createConnection, Connection, QueryError } from 'mysql2';
import dotenv from 'dotenv';
import { exec } from 'child_process';

dotenv.config();

const connection: Connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err: QueryError | null) => {
    if (err) {
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.warn('La base de datos no existe. Se procede a crearla.');
            exec('node .\\DB\\startDB.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al ejecutar startDB.js: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        } else {
            console.error('Error db: ' + err.message, err.code);
        }
    }
    console.log('Connected to the MySQL server.');
});

export default connection;