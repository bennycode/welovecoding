import * as React from 'react';
import {connect} from 'react-redux';
import {StoreState} from 'src/state/store';
import {Card} from 'src/components/modules/Layout';
import {Grid, Row, Col} from 'src/components/modules/Grid';

interface AuthenticatedStateProps {
  isWaiting: boolean;
  authenticated: boolean;
}

class Authenticated extends React.Component<AuthenticatedStateProps> {
  render() {
    return (
      <div>
        {this.props.authenticated
          ? this.props.children
          : <Grid>
              <Row center="xs">
                <Col sm={4}>
                  <Card>
                    {
                      'Um diese Seite öffnen zu können, müssen sie eingeloggt sein.'
                    }
                  </Card>
                </Col>
              </Row>
            </Grid>}
      </div>
    );
  }
}

export default connect<AuthenticatedStateProps, {}, {}>((state: StoreState) => {
  return {
    isWaiting: state.auth.isWaiting,
    authenticated: state.auth.authenticated,
  };
}, {})(Authenticated);
