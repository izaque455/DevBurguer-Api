import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';

const routes = new Router();

const upload = multer(multerConfig);

// Não precisa de Um token
routes.post('/users', UserControllers.store); // Cadastro
routes.post('/session', SessionController.store); // Login

// Precisa de Um token
routes.use(authMiddleware);

routes.post('/products', upload.single('file'), ProductController.store); // Criar Produto
routes.get('/products', ProductController.index); // Listar Produto

export default routes;
