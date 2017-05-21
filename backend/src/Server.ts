import * as express from "express";
import * as path from "path";

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.api();
  }

  public api(): void {
    this.app.get('/', (request: express.Request, response: express.Response): void => {
      response.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    });

    this.app.get('/rest', (request: express.Request, response: express.Response): void => {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({data: 'I run without webpack. 😛'}));
    });
  }

  public config(): void {
    this.app.use(express.static(path.join(__dirname, 'frontend')));
  }
}
