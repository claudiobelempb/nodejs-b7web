import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: "variables.env"});
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
  console.log(`Server run in port: ${server.address().port}`);
});
