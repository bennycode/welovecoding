<<<<<<< 1d112c26aaaa351ad9a09f05ec5a5beb2195ae90
import Server from "./Server";

const port: number = process.env.PORT || 8080;
const server: Server = new Server();
server.app.listen(port, () => {
  console.log(`Server is running on port "${port}".`);
=======
import * as express      from 'express';
import * as path         from 'path';
import * as bodyParser   from 'body-parser';
import * as passport     from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session      from 'express-session';

import sequelize         from 'src/models';
import User              from 'src/models/User';

sequelize;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'super-secret' }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Heroku sets the port on $PORT
const port = process.env.PORT || 8080;

// curl --data 'username=tom&password=mypassword' http://localhost:8080/login
app.post('/login',
  function (req, res, next) {
    // console.log('LOGIN', req.body.username, req.body.password);
    return passport.authenticate('local', {
      failureRedirect: '/no',
      successRedirect: '/yesss'
    })(req, res, next);
  },
  function(_, res) {
    res.redirect('/');
  }
);

app.get('/', (_, response) => {
  response.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/test', (_, response) => {
  console.log('test');
  response.write('hey you');
})

// serve frontend
app.use(express.static(path.join(__dirname, 'frontend')));

const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server is running. Try http://localhost:${port}/`);
>>>>>>> feat: sequelize / passport / data-model
});
