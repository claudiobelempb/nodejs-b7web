import { app } from './app';
import dotenv from 'dotenv';
dotenv.config({path: "variables.env"});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server run in port: ${server.address().port}`);
});
