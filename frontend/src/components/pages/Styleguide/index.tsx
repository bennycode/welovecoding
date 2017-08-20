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
            {'Small'}
            <Button small>
              {'Default button'}
            </Button>
            <Button small type="primary">
              {'Primary button'}
            </Button>
            <Button small type="info">
              {'Info button'}
            </Button>
            <Button small type="warning">
              {'Warning button'}
            </Button>
            <Button small type="success">
              {'Success button'}
            </Button>
            <hr />
            {'Medium'}
            <Button medium>
              {'Default button'}
            </Button>
            <Button medium type="primary">
              {'Primary button'}
            </Button>
            <Button medium type="info">
              {'Info button'}
            </Button>
            <Button medium type="warning">
              {'Warning button'}
            </Button>
            <Button medium type="success">
              {'Success button'}
            </Button>
            <hr />
            {'Large'}
            <Button large>
              {'Default button'}
            </Button>
            <Button large type="primary">
              {'Primary button'}
            </Button>
            <Button large type="info">
              {'Info button'}
            </Button>
            <Button large type="warning">
              {'Warning button'}
            </Button>
            <Button large type="success">
              {'Success button'}
            </Button>
            <hr />
            {'Ghost'}
            <Button outline medium>
              {'Default ghost button'}
            </Button>
            <Button outline medium type="primary">
              {'Primary ghost button'}
            </Button>
            <Button outline medium type="info">
              {'Info ghost button'}
            </Button>
            <Button outline medium type="warning">
              {'Warning ghost button'}
            </Button>
            <Button outline medium type="success">
              {'Success ghost button'}
            </Button>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Styleguide;
