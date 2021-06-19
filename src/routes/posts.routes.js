import { Router } from 'express';
import { PostsController } from '../controllers/PostsController';

const postsRoutes = Router();
const postsController = new PostsController();

postsRoutes.get('/posts', postsController.index);
postsRoutes.get('/posts/add', postsController.store);
postsRoutes.post('/posts/add', postsController.save);

export { postsRoutes };