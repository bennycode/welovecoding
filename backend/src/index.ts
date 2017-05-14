import * as express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (_, response) => {
  response.send('<p>Hello from Travis CI!</p>');
});

const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server is running. Try http://localhost:${port}/`);
});
