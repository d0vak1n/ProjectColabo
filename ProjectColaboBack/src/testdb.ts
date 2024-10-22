import { MysqlError, FieldInfo } from 'mysql';
import db from './functions/dbconnection';

db.query('SELECT 1', (error: MysqlError | null, results: any, fields: FieldInfo[] | undefined) => {
  if (error) throw error;
  console.log('La conexión a la base de datos es exitosa!');
});

db.end();