const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('<p>Hello World!</p>');
});

const server = app.listen(8080, () => {
  const port = server.address().port;
  console.log(`Server is running. Try http://localhost:${port}/`);
});