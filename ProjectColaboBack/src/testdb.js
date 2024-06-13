var db = require('./dbconnection');

db.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  console.log('La conexión a la base de datos es exitosa!');
});

db.end();