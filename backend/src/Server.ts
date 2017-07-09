import 'src/models';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as session from 'express-session';
import CONFIG_GOOGLE from 'src/config/google';
import User from 'src/models/User';
import {GoogleOAuthProfile} from 'src/types';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {PlusScopes, YouTubeScopes} from 'src/services/google/plus';
import {CategoryController} from "src/view/CategoryController";

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.api();
  }

  public middleware(): void {
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cookieParser());
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: 'super-secret',
      }),
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // Local
    passport.use(User.createStrategy());
    // Google
    passport.use(
      new GoogleStrategy(
        {
          clientID: CONFIG_GOOGLE.GOOGLE_CLIENT_ID,
          clientSecret: CONFIG_GOOGLE.GOOGLE_CLIENT_SECRET,
          // TODO
          callbackURL: `${process.env.APP_URL_BACKEND}/auth/google/callback`,
          // passReqToCallback: true,
        },
        function(accessToken, refreshToken, profile: GoogleOAuthProfile, done) {
          const email = profile.emails[0].value;
          User.findOrCreate<User>({
            where: {
              provider: User.PROVIDERS.google,
              providerId: profile.id,
            },
            defaults: {
              email,
            } as User,
          })
            .then(function([user, created]) {
              return done(null, user);
            })
            .catch(function(error) {
              console.log(error);
            });
        },
      ),
    );

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }

  public api(): void {
    this.app.get(
      '/rest',
      (request: express.Request, response: express.Response): void => {
        response.json({data: 'Hello, World!'});
      },
    );

    this.app.use('/rest/service/v1/categories', CategoryController);

    // curl --data "username=tom&password=mypassword" http://localwelovecoding.com:8080/auth/local
    this.app.post(
      '/auth/local',
      function(req, res, next) {
        return passport.authenticate('local', {
          failureRedirect: '/no',
          successRedirect: '/yesss',
        })(req, res, next);
      },
      function(_, res) {
        res.redirect('/');
      },
    );

    this.app.get(
      '/auth/google',
      passport.authenticate(
        'google',
        {
          scope: [
            PlusScopes.USERINFO_EMAIL,
            PlusScopes.USERINFO_PROFILE,
            YouTubeScopes.YOUTUBE_READONLY,
          ],
        },
        // function(error) {
        //   // TODO: improve error handling
        //   console.log('GOOGLE AUTH ERROR', error);
        // },
      ),
    );

    this.app.get(
      '/auth/google/callback',
      passport.authenticate(
        'google',
        {
          successRedirect: `${process.env.APP_URL_FRONTEND}/auth/google/success`,
          failureRedirect: `${process.env.APP_URL_FRONTEND}/auth/google/failure`,
        },
        // function(error) {
        //   // TODO: improve error handling
        //   console.log('GOOGLE AUTH CALLBACK ERROR', error);
        // },
      ),
      // function(req, res) {
      //   return res.json({success: true, data: ''});
      // },
    );
  }

  public config(): void {
    this.app.use(express.static(path.join(__dirname, 'frontend')));
  }
}
