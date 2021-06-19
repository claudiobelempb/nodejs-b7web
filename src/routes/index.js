import { Router } from 'express';

import { homeRoutes } from './home.routes';
import { adminRoutes } from './admin.routes';
import { userRoutes } from './user.routes';
import { postsRoutes } from './posts.routes';

const routes = Router();

routes.use(homeRoutes);
routes.use(postsRoutes);
routes.use(adminRoutes);
routes.use(userRoutes);

export { routes };