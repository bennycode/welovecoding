import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import * as Cookies from 'cookies-js';
import Header from 'src/components/modules/Header';
import {Grid, Row, Col} from 'src/components/modules/Grid';
import {Card} from 'src/components/modules/Layout';
import Spinner from 'src/components/modules/Spinner';
import {StoreState} from 'src/state/store';
import {AuthState, loginViaToken} from 'src/state/auth';

interface AppStateProps {
  auth: AuthState;
}

interface AppDispatchProps {
  loginViaToken: typeof loginViaToken;
}

interface AppState {
  loading: boolean;
}

interface AppOwnProps extends RouteComponentProps<{}> {
  children: React.ReactNode;
}

const AppLoading: React.StatelessComponent<{}> = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} xsOffset={3}>
          <Card>
            <Spinner />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

class App extends React.Component<AppStateProps & AppDispatchProps & AppOwnProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentWillMount() {
    const jwtToken = Cookies.get('jwt-token');
    if (jwtToken !== undefined) {
      (this.props.loginViaToken(jwtToken) as any)
        .then(() => {
          this.setState({
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    return (
      <div>
        <Header />
        {this.state.loading ? <AppLoading /> : null}
        <div style={{display: this.state.loading ? 'none' : 'block'}}>
        </div>
        {this.props.children}
      </div>
    );
  }
}

// with router is needed, so the component updates when the location is changed
export default withRouter(connect<AppStateProps, AppDispatchProps, AppOwnProps>(
  (state: StoreState) => {
    return {
      auth: state.auth,
    };
  },
  {
    loginViaToken,
  },
)(App)) as any;
