import { Router } from 'express';

const homeRoutes = Router();

homeRoutes.get('/', (request, response) => {
  return response.json({message: 'Home'});
});

export { homeRoutes}