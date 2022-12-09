import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';
import SessionsController from './app/controllers/SessionsController';
import UserController from './app/controllers/UserController';

import authMiddleare from './app/middlewares/auth';

const upload = multer(multerConfig);
const routes = new Router();

// Users
routes.post('/users', UserController.store);

// Login
routes.post('/sessions', SessionsController.store);

routes.use(authMiddleare); // toda rota abaixo é chamada o meu authMiddlewares

// Product
routes.post('/product', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

export default routes;
