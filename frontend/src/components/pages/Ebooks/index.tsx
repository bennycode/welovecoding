import * as React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Card} from 'src/components/modules/Layout';

const Ebooks: React.StatelessComponent = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Card>
            <h1>{'Ebooks'}</h1>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Ebooks;
