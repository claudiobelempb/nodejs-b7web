import { Router } from 'express';

const adminRoutes = Router();

adminRoutes.get('/admin', (request, response) => {
  return response.json({message: 'Admin'});
});

export { adminRoutes };