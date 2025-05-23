var mysql = require('mysql2');
var fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

con.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log("Conectado!");

    const sqlFilePath = path.resolve(__dirname, 'ProjectColabo.sql');
    const sql = fs.readFileSync(sqlFilePath).toString();

    var queries = sql.split(';');

    var queryPromise = function(query) {
        if (!query) {
            return Promise.resolve();
        }
        return new Promise(function(resolve, reject) {
            con.query(query, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Consulta ejecutada");
                    resolve(result);
                }
            });
        });
    };

    var promises = queries.map(queryPromise);

    Promise.all(promises)
        .then(function() {
            console.log("Todas las consultas se han completado");
            console.log("Cierre el programa con Ctrl+C y vuelva a ejecutarlo para arrancar el servidor");
        })
        .catch(function(err) {
            console.error(err.message);
        })
        .finally(function() {
            con.end();
            process.exit(0);
        });
});