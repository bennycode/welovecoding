import 'src/models';
import * as jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import CONFIG_GOOGLE from 'src/config/google';
import User from 'src/models/User';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {PlusProfile, PlusScopes, YouTubeScopes} from 'src/services/google/oauth';
import {CategoryController} from "src/view/CategoryController";

const SECRET = 'mycoolsecret';
// const authenticate = expressJwt({secret: SECRET});

function generateToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
    } as object,
    SECRET,
    {
      expiresIn: '120 minutes',
    },
  );
}

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
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.app.use(passport.initialize());

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
        function(accessToken, refreshToken, profile: PlusProfile, done) {
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

    // curl --data "username=tom&password=mypassword" http://localhost:8080/auth/local
    this.app.options('/auth/local', cors());
    this.app.post('/auth/local', cors(), function(req, res, next) {
      console.log(req.body);
      return passport.authenticate(
        'local',
        {
          session: false,
        },
        function(error, user: User, info) {
          // TODO: improve error handling
          if (error) {
            console.log('AUTH ERROR', error);
            return next(error);
          }
          if (!user) {
            return res.json({success: false, message: info.message});
          }
          req.logIn(user, loginErr => {
            if (loginErr) {
              return res.json({success: true, message: loginErr});
            }
            console.log(user);
            return res.json({
              success: true,
              email: user.email,
              token: generateToken(user),
            });
          });
        },
      )(req, res, next);
    });

    this.app.options('/auth/token', cors());
    this.app.get('/auth/token', cors(), function(req, res) {
      const token = req.headers.token;
      jwt.verify(token, SECRET, (err, decoded) => {
        console.log(decoded);
        if (err) {
          console.log('JWT error: ', err);
          res.json({success: false});
        } else {
          User.findById(decoded.id).then((user: User) => {
            res.json({
              success: true,
              data: {
                email: user.email,
                token,
              },
            });
          });
        }
      });
    });

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
        function(error) {
          // TODO: improve error handling
          if (error) {
            console.log('GOOGLE AUTH ERROR', error);
          }
        },
      ),
      function(req, res) {
        return res.json({
          success: false,
        });
      },
    );

    this.app.get('/auth/google/callback', function(req, res, next) {
      passport.authenticate('google', {}, function(error, user: User) {
        // TODO: improve error handling
        const token = generateToken(user);
        if (error) {
          console.log('GOOGLE AUTH CALLBACK ERROR', error);
          res.redirect(`${process.env.APP_URL_FRONTEND}/auth/google/failure`);
        } else {
          res.redirect(
            `${process.env.APP_URL_FRONTEND}/auth/google/success?token=${token}`,
          );
        }
        next();
      })(req, res, next);
    });
  }

  public config(): void {
    this.app.use(express.static(path.join(__dirname, 'frontend')));
  }
}
