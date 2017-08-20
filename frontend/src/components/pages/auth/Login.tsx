import * as React from 'react';
import {Grid, Row, Col} from 'src/components/modules/Grid';
import {connect} from 'react-redux';
import {TextField} from 'office-ui-fabric-react';

import Button from 'src/components/modules/Button';
import Typo from 'src/components/modules/Typo';
import {Card, Divider} from 'src/components/modules/Layout';
import {RouteComponentProps} from 'react-router';
import {manualLogin} from 'src/state/auth';
import Alert from 'src/components/modules/Alert';

import CONFIG from 'src/config';

class LocalLogin extends React.Component<
  {
    manualLogin: typeof manualLogin;
    history: any;
  },
  {
    password: string;
    username: string;
    error: string;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      error: '',
    };
    this.changePassword = this.changePassword.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeUsername(username) {
    this.setState({
      username,
    });
  }
  changePassword(password) {
    this.setState({
      password,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    (this.props.manualLogin(
      this.state.username,
      this.state.password,
    ) as any).then(res => {
      if (res.data.success) {
        this.props.history.push('/user/profile');
      } else {
        this.setState({
          error: res.data.message,
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Typo.SubHeader margin='medium'>
          {'Login with username/password'}
        </Typo.SubHeader>
        <form
          method="post"
          action={CONFIG.API.AUTH_LOCAL_LOGIN}
          onSubmit={this.onSubmit}
        >
          <TextField
            required
            label="Benutzername"
            name="username"
            onChanged={this.changeUsername}
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            onChanged={this.changePassword}
          />
          <Button type='info'>
            {'Submit'}
          </Button>
          {this.state.error !== ''
            ? <Alert>
                {this.state.error}
              </Alert>
            : null}
        </form>
      </div>
    );
  }
}

interface LoginDispatchProps {
  manualLogin: typeof manualLogin;
}

const Login: React.StatelessComponent<
  LoginDispatchProps & RouteComponentProps<{}>
> = ({manualLogin, history}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} xsOffset={3}>
          <Card>
            <Typo.SubHeader margin='medium'>
              {'Login with Google'}
            </Typo.SubHeader>
            <Button type='info' href={CONFIG.API.AUTH_GOOGLE_LOGIN}>
              {'Login with Google'}
            </Button>
            <Divider />
            <LocalLogin manualLogin={manualLogin} history={history} />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default connect<{}, LoginDispatchProps, any>(() => ({}), {manualLogin})(
  Login,
);
