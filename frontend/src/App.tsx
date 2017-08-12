import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from 'src/components/pages/auth/Login';
import GoogleAuthSuccess from 'src/components/pages/auth/GoogleAuthSuccess';
import UserProfile from 'src/components/pages/user/UserProfile';
import Header from 'src/components/modules/Header';

import Home from 'src/components/pages/Home';
import Tutorials from 'src/components/pages/Tutorials';
import Participate from 'src/components/pages/Participate';
import Sponsors from 'src/components/pages/Sponsors';
import Ebooks from 'src/components/pages/Ebooks';

import Authenticated from './Authenticated';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tutorials" component={Tutorials} />
          <Route exact path="/join" component={Participate} />
          <Route exact path="/sponsors" component={Sponsors} />
          <Route exact path="/ebooks" component={Ebooks} />
          <Route exact path="/login" component={Login} />
          <Route
            path="/auth/google/success"
            exact
            component={GoogleAuthSuccess}
          />
          <Authenticated>
            <Switch>
              <Route exact path="/user/profile" component={UserProfile} />
            </Switch>
          </Authenticated>
          <Route
            path="/auth/google/failure"
            component={() => <h1>Google Auth Fail!</h1>}
          />
        </Switch>
      </div>
    </Router>
  );
}
