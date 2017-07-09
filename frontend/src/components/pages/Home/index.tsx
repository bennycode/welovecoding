import * as React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Home: React.StatelessComponent<{}> = () => {
  return (
    <Grid>
        <Row>
            <Col xs={12}>
              {'Hey'}
            </Col>
        </Row>
    </Grid>
  );
};

export default Home;
