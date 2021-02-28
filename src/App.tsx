import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { history } from './app/store';
import { loadUser, selectAppStatus } from './appSlice';
import { EmployeeDetail } from './features/employee/EmployeeDetail';
import { EmployeeList } from './features/employee/EmployeeList';
import { NewEmployee } from './features/employee/NewEmployee';
import { Login } from './features/login/Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const appStatus = useSelector(selectAppStatus);

  useEffect(() => {
    auth.onAuthStateChanged(() => dispatch(loadUser()));
  });

  return (
    <>
      <CssBaseline />

      <ConnectedRouter history={history}>
        <Switch>
          <ProtectedRoute appStatus={appStatus} path="/employees">
            <EmployeeList />
          </ProtectedRoute>

          <ProtectedRoute appStatus={appStatus} path="/employees/new">
            <NewEmployee />
          </ProtectedRoute>

          <ProtectedRoute appStatus={appStatus} path="/employees/:id">
            <EmployeeDetail />
          </ProtectedRoute>

          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </ConnectedRouter>
    </>
  );
}

export default App;
