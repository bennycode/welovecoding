import * as React from 'react';
import {Grid, Row, Col} from 'src/components/modules/Grid';
import {Card} from 'src/components/modules/Layout';

const Ebooks: React.StatelessComponent = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Card>
            <h1>
              {'Ebooks'}
            </h1>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Ebooks;
