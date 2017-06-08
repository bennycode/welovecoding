import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as session from 'express-session';
import CategoryDTO from "./api/v1/dto/CategoryDTO";
import PlaylistDTO from "./api/v1/dto/PlaylistDTO";
import sequelize from './models';
import User from './models/User';
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
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cookieParser());
    this.app.use(session({
      resave: false,
      saveUninitialized: false,
      secret: 'super-secret'
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }

  public api(): void {
    this.app.get('/rest', (request: express.Request, response: express.Response): void => {
      response.json({data: 'Hello, World!'});
    });

    this.setupLegacyAPI();

    // curl --data "username=tom&password=mypassword" http://localhost:8080/login
    this.app.post('/login',
      function (req, res, next) {
        return passport.authenticate('local', {
          failureRedirect: '/no',
          successRedirect: '/yesss'
        })(req, res, next);
      },
      function (_, res) {
        res.redirect('/');
      }
    );
  }

  private setupLegacyAPI() {
    // Mock categories
    const categories = [];
    let category;

    category = new CategoryDTO(1, "Windows Phone");
    category.color = "#19A2DE";
    categories.push(category.toJSON());

    const playlist: PlaylistDTO = new PlaylistDTO(4, "Java Tutorials von Anfang an");
    playlist.language = "German";

    category = new CategoryDTO(2, "Java");
    category.color = "#E61400";
    category.addPlaylist(playlist);
    categories.push(category.toJSON());

    category = new CategoryDTO(3, "PHP");
    category.color = "#643EBF";
    categories.push(category.toJSON());

    // Sort result
    categories.sort((category: CategoryDTO, anotherCategory: CategoryDTO) => category.name.localeCompare(anotherCategory.name));

    // Issue response
    this.app.get('/rest/service/v1/categories', (request: express.Request, response: express.Response): void => {
      response.json(categories);
    });
  }

  public config(): void {
    this.app.use(express.static(path.join(__dirname, 'frontend')));
  }
}
