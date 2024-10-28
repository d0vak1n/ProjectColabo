import { Connection, createConnection, QueryError, RowDataPacket, FieldPacket } from 'mysql2';
import db from './functions/dbconnection';

db.query('SELECT 1', (error: QueryError | null, results: any, fields: RowDataPacket[] | undefined) => {
  if (error) throw error;
  console.log('La conexión a la base de datos es exitosa!');
});

db.end();