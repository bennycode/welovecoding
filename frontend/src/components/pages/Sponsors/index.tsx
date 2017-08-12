import * as React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Card} from 'src/components/modules/Layout';

const Sponsors: React.StatelessComponent = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Card>
            <h1>{'Sponsors'}</h1>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Sponsors;
