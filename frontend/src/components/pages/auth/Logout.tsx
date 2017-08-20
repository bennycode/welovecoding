import * as React from 'react';
import {connect} from 'react-redux';

import {RouteComponentProps} from 'react-router';
import {Grid, Row, Col} from 'src/components/modules/Grid';
import {Card} from 'src/components/modules/Layout';
import {manualLogout} from 'src/state/auth';

interface LogoutDispatchProps {
  manualLogout: typeof manualLogout;
}

type LogoutOwnProps = RouteComponentProps<{}>;

class Logout extends React.Component<LogoutDispatchProps & LogoutOwnProps> {
  componentWillMount() {
    this.props.manualLogout();
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Card>
              {'Logout successfull!'}
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect<{}, LogoutDispatchProps, LogoutOwnProps>(null, {
  manualLogout,
})(Logout);
