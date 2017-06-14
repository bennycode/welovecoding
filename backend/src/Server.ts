import 'src/models';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as session from 'express-session';
import CategoryDTO from 'src/api/v1/dto/CategoryDTO';
import CONFIG_GOOGLE from 'src/config/google';
import PlaylistDTO from 'src/api/v1/dto/PlaylistDTO';
import User from 'src/models/User';
import {GoogleOAuthProfile} from 'src/types';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

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
        secret: 'super-secret'
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
          callbackURL: 'http://localwelovecoding.com:8080/auth/google/callback',
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

    this.setupLegacyAPI();

    // curl --data "username=tom&password=mypassword" http://localhost:8080/auth/local
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
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read',
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
          successRedirect: 'http://localhost:8081/auth/google/success',
          failureRedirect: 'http://localhost:8081/auth/google/failure',
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

  private setupLegacyAPI() {
    // Mock categories
    const categories = [];
    let category;

    category = new CategoryDTO(1, 'Windows Phone');
    category.color = '#19A2DE';
    categories.push(category.toJSON());

    const playlist: PlaylistDTO = new PlaylistDTO(4, 'Java Tutorials von Anfang an');
    playlist.language = 'German';

    category = new CategoryDTO(2, 'Java');
    category.color = '#E61400';
    category.addPlaylist(playlist);
    categories.push(category.toJSON());

    category = new CategoryDTO(3, 'PHP');
    category.color = '#643EBF';
    categories.push(category.toJSON());

    // Sort result
    categories.sort((category: CategoryDTO, anotherCategory: CategoryDTO) =>
      category.name.localeCompare(anotherCategory.name),
    );

    // Issue response
    this.app.get(
      '/rest/service/v1/categories',
      (request: express.Request, response: express.Response): void => {
        response.json(categories);
      },
    );
  }

  public config(): void {
    this.app.use(express.static(path.join(__dirname, 'frontend')));
  }
}
