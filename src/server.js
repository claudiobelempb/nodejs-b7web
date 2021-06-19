import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import './models/Posts';

//config variables
dotenv.config({path: "variables.env"});

// config mongodb
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${server.address().port}`);
});
