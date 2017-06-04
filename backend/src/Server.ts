import * as express from "express";
import * as path from "path";
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import sequelize from 'src/models';
import User from 'src/models/User';

sequelize;

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.api();
  }

  middleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(session({ secret: 'super-secret' }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }

  public api(): void {
    this.app.get('/', (request: express.Request, response: express.Response): void => {
      response.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    });

    this.app.get('/rest', (request: express.Request, response: express.Response): void => {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({data: 'I run with webpack.'}));
    });

    // curl --data 'username=tom&password=mypassword' http://localhost:8080/login
    this.app.post('/login',
      function (req, res, next) {
        return passport.authenticate('local', {
          failureRedirect: '/no',
          successRedirect: '/yesss'
        })(req, res, next);
      },
      function(_, res) {
        res.redirect('/');
      }
    );
  }

  public config(): void {
    this.app.use(express.static(path.join(__dirname, 'frontend')));
  }
}
