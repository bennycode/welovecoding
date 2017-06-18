import 'source-map-support/register';
import {APP_ENV, POSSIBLE_APP_ENVS} from 'src/config/environment';
if (APP_ENV === POSSIBLE_APP_ENVS.DEVELOPMENT) { require('dotenv').config(); }

import Server from './Server';

const port: number = process.env.PORT || 8080;
const server: Server = new Server();
server.app.listen(port, () => {
  console.log(`Server is running on port "${port}".`);
});
