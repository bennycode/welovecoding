import * as React from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-flexbox-grid';
import {
  NavLink,
} from 'react-router-dom';

import {
  Button,
} from 'office-ui-fabric-react';

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

const Header: React.StatelessComponent<{}> = () => {
  return (
    <div className="wlc_header">
      <Grid>
        <Row>
          <Col>
            {MENU.map(menuItem => (
              <NavLink
                to={menuItem.path}
                key={menuItem.path}
                activeClassName="wlc_header__button-link--active"
                exact
              >
                <NavigationButton>
                  {menuItem.name}
                </NavigationButton>
              </NavLink>
            ))}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Header;
