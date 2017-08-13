import * as React from 'react';
import {Grid, Row, Col} from 'src/components/modules/Grid';
import Typo from 'src/components/modules/Typo';
import Button from 'src/components/modules/Button';
import {Card} from 'src/components/modules/Layout';

const Styleguide: React.StatelessComponent<{}> = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Card>
            <Typo.H1>
              {'Styleguide'}
            </Typo.H1>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Typo.H1>
              {'Typographie'}
            </Typo.H1>
            <hr />
            <Typo.H1>
              {'H1'}
            </Typo.H1>
            <Typo.H2>
              {'H2'}
            </Typo.H2>
            <Typo.H3>
              {'H3'}
            </Typo.H3>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Typo.H1>
              {'Buttons'}
            </Typo.H1>
            <hr />
            <Button>
              {'Default button'}
            </Button>
            <Button type='primary'>
              {'Primary button'}
            </Button>
            <Button type='info'>
              {'Info button'}
            </Button>
            <Button type='warning'>
              {'Warning button'}
            </Button>
            <Button type='success'>
              {'Success button'}
            </Button>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Styleguide;
