import * as React from 'react';
import {Grid, Row, Col} from 'src/components/modules/Grid';
import {Card} from 'src/components/modules/Layout';

const Participate: React.StatelessComponent = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Card>
            <h1>
              {'Participate'}
            </h1>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Participate;
