import * as React from 'react';
import {Grid} from 'src/components/modules/Grid';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {NavLink, withRouter} from 'react-router-dom';

import {StoreState} from 'src/state/store';
import {AuthState} from 'src/state/auth';
import {logos} from 'src/constants/assets';

import './Header.scss';

const MENU = [
  {
    name: 'Home',
    path: '/',
    authenticated: false,
  },
  {
    name: 'Tutorials',
    path: '/tutorials',
    authenticated: true,
  },
  {
    name: 'E-books',
    path: '/ebooks',
    authenticated: true,
  },
  {
    name: 'Mach mit!',
    path: '/join',
    authenticated: true,
  },
  {
    name: 'Sponsoren',
    path: '/sponsors',
    authenticated: true,
  },
  {
    name: 'Styleguide',
    path: '/styleguide',
    authenticated: true,
  },
  {
    name: 'User Profile',
    path: '/user/profile',
    authenticated: true,
  },
  {
    name: 'Logout',
    path: '/logout',
    authenticated: true,
  },
  {
    name: 'Login',
    path: '/login',
    authenticated: false,
  },
];

const NavigationButton: React.StatelessComponent = ({children}) => {
  return (
    <span>
      {children}
    </span>
  );
};

interface HeaderStateProps {
  auth: AuthState;
}

type HeaderOwnProps = RouteComponentProps<{}>;

class Header extends React.Component<HeaderStateProps & HeaderOwnProps> {
  render() {
    const {auth} = this.props;
    return (
      <div className="wlc_header-container">
        <Grid>
          <div className="wlc_header">
            <div className="wlc_header-logo">
              <img src={logos.male} />
            </div>
            <div className="wlc_header-nav">
              {MENU.filter(m => m.authenticated === auth.authenticated).map(menuItem =>
                <NavLink
                  to={menuItem.path}
                  key={menuItem.path}
                  className="wlc_header__link"
                  activeClassName="wlc_header__button-link--active"
                  exact
                >
                  <NavigationButton>
                    {menuItem.name}
                  </NavigationButton>
                </NavLink>,
              )}
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

// bug with withRouter and redux, must be exported as any currently
export default withRouter(
  connect<HeaderStateProps, {}, HeaderOwnProps>((state: StoreState) => {
    return {
      auth: state.auth,
    };
  }, {})(Header),
) as any;
