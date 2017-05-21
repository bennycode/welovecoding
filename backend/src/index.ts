import * as express from 'express';
import * as path from 'path';

const app = express();
// Heroku sets the port on $PORT
const port = process.env.PORT || 8080;

app.get('/', (_, response) => {
  response.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/test', (_, response) => {
  response.send('Testing...\n');
});

// serve frontend
app.use(express.static(path.join(__dirname, 'frontend')));

const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server is running. Try http://localhost:${port}/`);
});
