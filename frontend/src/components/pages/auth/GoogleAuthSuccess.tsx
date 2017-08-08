import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {loginViaToken} from 'src/state/auth';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Card} from 'src/components/modules/Layout';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react';

type GoogleAuthSuccessOwnProps = RouteComponentProps<{}>;

interface GoogleAuthSuccessDispatchProps {
  loginViaToken: any;
}

class GoogleAuthSuccess extends React.Component<
  GoogleAuthSuccessOwnProps & GoogleAuthSuccessDispatchProps
> {
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token');
    if (token) {
      this.props.loginViaToken(token).then(res => {
        if (res.data.success === true) {
          this.props.history.push('/user/profile');
        }
      });
    } else {
      // TODO: redirect
    }
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} xsOffset={3}>
            <Card>
              <Spinner size={SpinnerSize.large} label={'Checking...'} />
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect<
  {},
  GoogleAuthSuccessDispatchProps,
  GoogleAuthSuccessOwnProps
>(() => ({}), {loginViaToken})(GoogleAuthSuccess);
