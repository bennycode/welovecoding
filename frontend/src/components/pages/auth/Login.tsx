import * as React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {Button, TextField} from 'office-ui-fabric-react';
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
        <h2>{'Login with username/password'}</h2>
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
          <Button type="submit">{'Submit'}</Button>
          {this.state.error !== '' ? <Alert>{this.state.error}</Alert> : null}
        </form>
      </div>
    );
  }
}

interface LoginDispatchProps {
  manualLogin: typeof manualLogin;
}

const Login: React.StatelessComponent<LoginDispatchProps & RouteComponentProps<{}>> = ({manualLogin, history}) => {
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
            <LocalLogin manualLogin={manualLogin} history={history}/>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default connect<{}, LoginDispatchProps, any>(() => ({}), {manualLogin})(
  Login,
);
