import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {NavLink, withRouter} from 'react-router-dom';
import {Grid} from 'src/components/modules/Grid';

import {StoreState} from 'src/state/store';
import {AuthState} from 'src/state/auth';
import {logos} from 'src/constants/assets';

import './Header.scss';

const MENU = [
  {
    name: 'Home',
    path: '/',
    public: true,
    private: true,
  },
  {
    name: 'Tutorials',
    path: '/tutorials',
    private: true,
    public: false,
  },
  {
    name: 'E-books',
    path: '/ebooks',
    private: true,
    public: false,
  },
  {
    name: 'Mach mit!',
    path: '/join',
    private: true,
    public: false,
  },
  {
    name: 'Sponsoren',
    path: '/sponsors',
    private: true,
    public: false,
  },
  {
    name: 'Styleguide',
    path: '/styleguide',
    private: true,
    public: false,
  },
  {
    name: 'User Profile',
    path: '/user/profile',
    private: true,
    public: false,
  },
  {
    name: 'Logout',
    path: '/logout',
    private: true,
    public: false,
  },
  {
    name: 'Login',
    path: '/login',
    public: true,
    private: false,
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
              {MENU.filter(
                m => (auth.authenticated ? m.private : m.public),
              ).map(menuItem =>
                <NavLink
                  to={menuItem.path}
                  key={menuItem.path}
                  className="wlc_btn no-focus"
                  activeClassName="wlc_btn--primary"
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
