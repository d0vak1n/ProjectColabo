import { login } from './users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './dbconnection';
import { Request, Response } from 'express';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('./dbconnection');

describe('login', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: jsonMock });

        req = {
            body: {
                email: 'test@test.com',
                password: 'test',
            },
        };

        res = {
            status: statusMock,
            json: jsonMock,
            send: jsonMock,
        };

        (db.query as jest.Mock).mockImplementation((query: string, values: any[], callback: Function) => {
            if (query.includes('SELECT')) {
                callback(null, [{ email: 'test@test.com', password: 'hashedpassword' }]);
            }
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('mockToken');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token for valid credentials', async () => {
        await login(req as Request, res as Response);
        expect(db.query).toHaveBeenCalledWith('SELECT * FROM estudiantes WHERE email = ?', ['test@test.com'], expect.any(Function));
        expect(bcrypt.compare).toHaveBeenCalledWith('test', 'hashedpassword');
        expect(jwt.sign).toHaveBeenCalledWith({ email: 'test@test.com' }, process.env.SECRET as string);
        expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return 401 if user is not found', async () => {
        (db.query as jest.Mock).mockImplementation((query: string, values: any[], callback: Function) => {
            if (query.includes('SELECT')) {
                callback(null, []);
            }
        });

        await login(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Correo y/o contraseña incorrectos');
    });

    it('should return 401 if password is invalid', async () => {
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await login(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Correo y/o contraseña incorrectos');
    });

    it('should return 500 if there is a database error', async () => {
        (db.query as jest.Mock).mockImplementation((query: string, values: any[], callback: Function) => {
            if (query.includes('SELECT')) {
                callback(new Error('Database error'), null);
            }
        });

        await login(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error al consultar la base de datos');
    });
});