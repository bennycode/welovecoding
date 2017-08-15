import * as React from 'react';
import {Link} from 'react-router-dom';
import Typo from 'src/components/modules/Typo';
import Button from 'src/components/modules/Button';
import Grid from 'src/components/modules/Grid';
import {logos} from 'src/constants/assets';

import './Footer.scss';

const FOOTER_LINKS = [
  {
    name: 'Tutorials',
    link: '/tutorials',
  },
  {
    name: 'E-books',
    link: '/ebooks',
  },
  {
    name: 'Mach mit!',
    link: '/join',
  },
  {
    name: 'Sponseren',
    link: '/sponsors',
  },
  {
    name: 'Login',
    link: '/login',
  },
];

const Footer: React.StatelessComponent<{}> = () => {
  return (
    <footer className="wlc_footer">
      <Grid.Grid>
        <Grid.Row middle="xs" between="xs">
          <Grid.Col>
            <div className="wlc_footer-logo">
              <img src={logos.male} />
            </div>
          </Grid.Col>
          <Grid.Col>
            {FOOTER_LINKS.map(({name, link}) => {
              return (
                <Link to={link} key={name}>
                  <Button>
                    {name}
                  </Button>
                </Link>
              );
            })}
          </Grid.Col>
          <Grid.Col>
            <Typo.Mute size={'xs'}>
              {'© Benny Neugebauer, Michael Koppen & Tom Nick'}
            </Typo.Mute>
          </Grid.Col>
        </Grid.Row>
      </Grid.Grid>
    </footer>
  );
};

export default Footer;
