import * as React from 'react';
import {Grid, Row, Col} from 'src/components/modules/Grid';
import Typo from 'src/components/modules/Typo';
// import {Card} from 'src/components/modules/Layout';
import Button from 'src/components/modules/Button';
import Avatar from 'src/components/modules/Avatar';
import {TutorialCard} from 'src/components/modules/Tutorial';

import './Home.scss';

const Home: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <div className="wlc_hero">
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <Typo.H1 size={'su'}>
                {'Informatik Tutorials'}
              </Typo.H1>
              <Typo.P>
                {
                  'We Love Coding bietet eine zahlreiche Sammlung von kostenlosen Video-Tutorials für Entwickler'
                }
              </Typo.P>
              <Button large type="white">
                {'Become a nerd'}
              </Button>
              <div className="wlc_home-spacer">
                {'or'}
              </div>
              <Button large type="white" outline>
                {'Get the App'}
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="wlc_section--white">
        <Grid>
          <Row>
            <Col xs={12}>
              <Avatar>
                <Typo.P>
                  {
                    `Lorem ipsum dolor sit amet,
                    consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    `
                  }
                </Typo.P>
              </Avatar>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <Row between="xs" middle="xs" gutterTopBottom>
          <Col>
            <Typo.H2>
              {'Neue Tutorials'}
            </Typo.H2>
          </Col>
          <Col>
            <Button type="grey" outline>
              {'Alle Tutorials'}
            </Button>
          </Col>
        </Row>
        <Row gutterTopBottom>
          <Col xs={4}>
            <TutorialCard />
          </Col>
          <Col xs={4}>
            <TutorialCard color="blue" />
          </Col>
          <Col xs={4}>
            <TutorialCard color="turquise" />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Home;
