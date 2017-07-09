import * as React from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-flexbox-grid';
import {
  Button,
  TextField,
} from 'office-ui-fabric-react';
import {
  Card,
  Divider,
} from 'src/components/modules/Layout';

import CONFIG from 'src/config';

const Login: React.StatelessComponent = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} xsOffset={3}>
          <Card>
            <h2>{'Login with Google'}</h2>
            <Button href={CONFIG.API.AUTH_GOOGLE_LOGIN}>
              {'Login with Google'}
            </Button>
            <Divider />
            <h2>{'Login with username/password'}</h2>
            <form method="post" action={CONFIG.API.AUTH_LOCAL_LOGIN}>
              <TextField required label="Benutzername" />
              <TextField required label="Password" type="password"/>
              <Button type="submit">{'Submit'}</Button>
            </form>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default Login;
