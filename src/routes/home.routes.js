import { Router } from 'express';
import { HomeController } from '../controllers/HomeController';

const homeRoutes = Router();
const homeController = new HomeController();

homeRoutes.get('/', homeController.index);

export { homeRoutes };