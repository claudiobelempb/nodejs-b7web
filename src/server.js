import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//config variables
dotenv.config({path: "variables.env"});

import './models/Posts';

// config mongodb
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${server.address().port}`);
});
