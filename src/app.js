import express from 'express';

const app = express();
const router = express.Router();

router.get('/', (request, response) => {
  return response.json({
    message: "Hello World!",
  });
});
app.use('/', router)

export { app };