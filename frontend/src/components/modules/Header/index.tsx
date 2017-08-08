import * as React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {RouteComponentProps} from 'react-router';
import {NavLink, withRouter} from 'react-router-dom';

import {Button} from 'office-ui-fabric-react';

import {StoreState} from 'src/state/store';
import {AuthState} from 'src/state/auth';

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
    <div className="wlc_header__button">
      <Button>
        {children}
      </Button>
    </div>
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
      <div className="wlc_header">
        <Grid>
          <Row>
            <Col>
              {MENU.map(menuItem =>
                <NavLink
                  to={menuItem.path}
                  key={menuItem.path}
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
            </Col>
          </Row>
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
