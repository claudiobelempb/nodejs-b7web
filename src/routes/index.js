import { Router } from 'express';

import { homeRoutes } from './home.routes';
import { adminRoutes } from './admin.routes';

const routes = Router();

routes.get('/', homeRoutes);
routes.get('/admin', adminRoutes);

export { routes };