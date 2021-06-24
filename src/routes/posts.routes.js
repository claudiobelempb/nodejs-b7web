import { Router } from 'express';
import { PostsController } from '../controllers/PostsController';
import multer from 'multer';
import { uploadCelke }  from '../middlewares/uploadCelke';
import { uploadFileImages } from '../middlewares/uploadFileImages';
import { resizeFileImages } from '../middlewares/resizeFileImages';

const upload = multer(uploadCelke);

const postsRoutes = Router();
const postsController = new PostsController();

postsRoutes.get('/posts', postsController.index);
postsRoutes.get('/posts/add', postsController.store);
postsRoutes.post('/posts/add', upload.single('photo'), postsController.save);
postsRoutes.post('/posts/create', uploadFileImages, resizeFileImages, postsController.createFile);
postsRoutes.get('/posts/:slug/edit', postsController.update);
postsRoutes.post('/posts/:slug/edit', postsController.updateAction);
postsRoutes.get('/posts/:slug', postsController.show);

export { postsRoutes };