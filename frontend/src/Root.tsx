import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from 'src/components/pages/auth/Login';
import Logout from 'src/components/pages/auth/Logout';
import GoogleAuthSuccess from 'src/components/pages/auth/GoogleAuthSuccess';
import UserProfile from 'src/components/pages/user/UserProfile';

import Home from 'src/components/pages/Home';
import Tutorials from 'src/components/pages/Tutorials';
import Participate from 'src/components/pages/Participate';
import Sponsors from 'src/components/pages/Sponsors';
import Ebooks from 'src/components/pages/Ebooks';
import Styleguide from 'src/components/pages/Styleguide';

import Authenticated from './Authenticated';
import App from './App';

export default function Root() {
  return (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route
            path="/auth/google/success"
            exact
            component={GoogleAuthSuccess}
          />
          <Authenticated>
            <Switch>
              <Route exact path="/tutorials" component={Tutorials} />
              <Route exact path="/join" component={Participate} />
              <Route exact path="/sponsors" component={Sponsors} />
              <Route exact path="/ebooks" component={Ebooks} />
              <Route exact path="/styleguide" component={Styleguide} />
              <Route exact path="/user/profile" component={UserProfile} />
            </Switch>
          </Authenticated>
          <Route
            path="/auth/google/failure"
            component={() => <h1>Google Auth Fail!</h1>}
          />
        </Switch>
      </App>
    </Router>
  );
}
