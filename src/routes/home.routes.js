import { Router } from 'express';

const homeRoutes = Router();

homeRoutes.get('/', (request, response) => {
  const data = {
    name: 'Cláudio Cardoso',
    idade: 44,
  }
  return response.render('home', data);
});

export { homeRoutes}