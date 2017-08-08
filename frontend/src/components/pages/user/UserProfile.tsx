import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {Card} from 'src/components/modules/Layout';
import {StoreState} from 'src/state/store';

interface UserProfileStateProps {
  email: string;
}

type UserProfileOwnProps = RouteComponentProps<{}>;

const UserProfile = ({email}: UserProfileStateProps & UserProfileOwnProps) => {
  return (
    <Grid>
      <Row>
        <Col>
          <Card>
            <h1>{`Hey User ${email}, you are signed in!`}</h1>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default connect<
  UserProfileStateProps,
  {},
  UserProfileOwnProps
>((state: StoreState) => {
  return {
    email: state.auth.email,
  };
}, {})(UserProfile);
