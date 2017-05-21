import * as express from 'express';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (_, response) => {
  response.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/rest', (_, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({data: 'Hello, World!'}));
});

app.use(express.static(path.join(__dirname, 'frontend')));

const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server is running. Try http://localhost:${port}/`);
});
