import { app } from './app';

app.set('port', 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server run in port: ${server.address().port}`);
});
