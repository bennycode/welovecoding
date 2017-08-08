import * as React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Typo from 'src/components/modules/Typo';
import {Card} from 'src/components/modules/Layout';

const Home: React.StatelessComponent<{}> = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Card>
            <Typo.H1>
              {'Hey'}
            </Typo.H1>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Home;
