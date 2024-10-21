import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users from './src/functions/users';
import projects from './src/functions/projects';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.use(express.json());
app.use(cors());

app.post('/register', (req: Request, res: Response) => users.register(req, res));
app.post('/login', (req: Request, res: Response) => users.login(req, res));
app.get('/projects', (req: Request, res: Response) => projects.getProjects(req, res));
app.get('/profile', (req: Request, res: Response) => users.getUserData(req, res));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});