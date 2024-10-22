import { Request, Response } from 'express';
import db from './dbconnection';

const getProjects = (req: Request, res: Response): void => {
    db.query('SELECT proyectos.*, estudiantes.nombre, estudiantes.apellido FROM proyectos JOIN estudiantes ON proyectos.creador_id = estudiantes.id', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error al consultar la base de datos');
        }
        res.json(results);
    });
};

const createProject = (req: Request, res: Response): void => {
    const { title, description, technologies, github, url } = req.body;

    db.query('INSERT INTO proyectos SET ?', { title, description, technologies, github, url }, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error al insertar el proyecto');
        }
        res.status(201).send('Proyecto insertado correctamente');
    });
};

export { getProjects, createProject };