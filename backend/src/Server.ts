import 'src/models';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';

import User from 'src/models/User';

import CategoryRoutes from 'src/routes/CategoryRoutes';
import UserRoutes from 'src/routes/UserRoutes';
import TestRoutes from 'src/routes/TestRoutes';

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.frontend();
  }

  public middleware(): void {
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.app.use(passport.initialize());
    passport.use(User.createLocalStrategy());
    passport.use(User.createGoogleStrategy(`${process.env.APP_URL_BACKEND}/auth/google/callback`));
  }

  public routes(): void {
    this.app.use(TestRoutes);
    this.app.use(CategoryRoutes);
    this.app.use(UserRoutes);

  }

  public frontend(): void {
    this.app.use(express.static(path.join(__dirname, 'frontend')));
    this.app.get('*', function(req, res){
      res.status(200).sendFile(path.join(__dirname, 'frontend', 'index.html'));
    });
  }
}
