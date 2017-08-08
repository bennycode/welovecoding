import * as React from 'react';
import {connect} from 'react-redux';
import {StoreState} from 'src/state/store';

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
          : <div>You are not allowed!</div>}
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
