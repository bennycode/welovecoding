import * as express from 'express';
import * as http from 'http';
import * as path from 'path';

const app: express.Application = express();
const port: number = process.env.PORT || 8080;

app.get('/', (request: express.Request, response: express.Response): void => {
  response.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/rest', (request: express.Request, response: express.Response): void => {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({data: 'I run without webpack. 😛'}));
});

app.use(express.static(path.join(__dirname, 'frontend')));

const server: http.Server = app.listen(port, () => {
  const port: number = server.address().port;
  console.log(`Server is running. Try http://localhost:${port}/`);
});
