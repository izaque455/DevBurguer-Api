import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserControllers.store);
routes.post('/session', SessionController.store);
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

export default routes;
