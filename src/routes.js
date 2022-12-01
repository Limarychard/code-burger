import { Router } from 'express';
import SessionsController from './app/controllers/SessionsController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/sessions', SessionsController.store);


export default routes;
