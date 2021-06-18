import { Router } from 'express';

import { homeRoutes } from './home.routes';
import { adminRoutes } from './admin.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.get('/', homeRoutes);
routes.get('/users/login', userRoutes);
routes.get('/admin', adminRoutes);

export { routes };