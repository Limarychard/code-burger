import { Router } from 'express';
import ProductController from './app/controllers/ProductController';
import SessionsController from './app/controllers/SessionsController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

routes.post('/product', ProductController.store);

export default routes;
