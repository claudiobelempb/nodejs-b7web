import express from 'express';
import path from 'path';
import mustache from 'mustache-express';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import flash from 'express-flash';

import dotenv from 'dotenv';

//config variables
dotenv.config({path: "variables.env"});

import { routes } from './routes';
import helpers from './helpers';
import { errorNotFound } from './middlewares/errorNotFound';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.static(path.resolve(__dirname, '../', 'public')));

app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

app.use((request, response, next) => {
  response.locals.h = helpers;
  response.locals.flashes = request.flash(),
  next();
});

app.use(routes);
app.use(errorNotFound);

app.engine('mst', mustache(path.resolve(__dirname, './views', 'partials'), '.mst'));
app.set('view engine', 'mst');
app.set('views', path.resolve(__dirname, './views'));

export { app };