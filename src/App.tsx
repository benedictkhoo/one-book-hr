import { CssBaseline } from '@material-ui/core';
import 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'reactfire';
import { loadUser, selectAppStatus } from './appSlice';
import { EmployeeList } from './features/employee/EmployeeList';
import { Login } from './features/login/Login';

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
      {
        appStatus === 'authenticated'
        ? <EmployeeList />
        : <Login />
      }
    </>
  );
}

export default App;
