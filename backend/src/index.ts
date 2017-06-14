import 'source-map-support/register';
import Server from './Server';

const port: number = process.env.PORT || 8080;
const server: Server = new Server();
server.app.listen(port, () => {
  console.log(`Server is running on port "${port}".`);
});
