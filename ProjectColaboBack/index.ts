import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { register, login, getUserData } from './src/functions/users';
import { createProject, getProjects } from './src/functions/projects';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.use(express.json());
app.use(cors());

app.post('/register', (req: Request, res: Response) => register(req, res));
app.post('/login', (req: Request, res: Response) => login(req, res));
app.get('/projects', (req: Request, res: Response) => getProjects(req, res));
app.post('/projects/new', (req: Request, res: Response) => createProject(req, res));
app.get('/profile', (req: Request, res: Response) => getUserData(req, res));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});