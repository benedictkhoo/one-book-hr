import React from 'react';
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';

type ProtectedRouteParams = {}

type ProtectedRoutePropsType = RouteComponentProps<ProtectedRouteParams> & {
  appStatus: string;
  path: string;
  exact?: boolean;
}

class ProtectedRoute extends React.Component<ProtectedRoutePropsType> {
  render() {
    const { appStatus, children, ...rest } = this.props;

    return (
      <Route
        { ...rest }
        render={
          () => appStatus !== 'authenticated'
            ? (<Redirect to="/" />)
            : (children)
        }
      />
    );
  }
}

export default withRouter(ProtectedRoute);
