import * as React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Login from 'src/components/pages/auth/Login';
import Home from 'src/components/pages/Home';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route
          path="/auth/google/success"
          component={() => <h1>Google Auth Success!</h1>}
        />
        <Route
          path="/auth/google/failure"
          component={() => <h1>Google Auth Fail!</h1>}
        />
      </div>
    </Router>
  );
}
