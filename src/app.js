import express from 'express';
import path from 'path';
import mustache from 'mustache-express';
import { routes } from './routes'

const app = express();
app.use(express.json());
app.use(routes);

app.engine('mst', mustache());
app.set('view engine', 'mst');
app.set('views', path.resolve(__dirname, './views'));

export { app };