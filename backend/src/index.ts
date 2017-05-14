import * as express from 'express';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 8080;

// app.get('/', (_, response) => {
//   response.send('<p>Hello from Travis CI!</p>');
// });

// serve frontend
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'frontend')));

const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server is running. Try http://localhost:${port}/`);
});
