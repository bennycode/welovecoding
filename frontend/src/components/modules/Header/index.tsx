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
  },
  {
    name: 'Tutorials',
    path: '/tutorials',
  },
  {
    name: 'E-books',
    path: '/ebooks',
  },
  {
    name: 'Mach mit!',
    path: '/join',
  },
  {
    name: 'Sponsoren',
    path: '/sponsors',
  },
  {
    name: 'Login',
    path: '/login',
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
              {MENU.map(menuItem =>
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
              {auth.authenticated
                ? <NavLink
                    to={'/user/profile'}
                    activeClassName="wlc_header__button-link--active"
                    exact
                  >
                    <NavigationButton>
                      {auth.email}
                    </NavigationButton>
                  </NavLink>
                : null}
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
