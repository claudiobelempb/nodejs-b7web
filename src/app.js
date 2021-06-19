import express from 'express';
import path from 'path';
import mustache from 'mustache-express';
import { routes } from './routes';
import helpers from './helpers';
import { errorNotFound } from './handlers/errorNotFound';

const app = express();
app.use(express.json());

app.use((request, response, next) => {
  response.locals.h = helpers;
  next();
});

app.use(routes);
app.use(errorNotFound);

app.engine('mst', mustache(path.resolve(__dirname, './views', 'partials'), '.mst'));
app.set('view engine', 'mst');
app.set('views', path.resolve(__dirname, './views'));

export { app };