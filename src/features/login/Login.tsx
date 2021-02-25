import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAppStatus } from '../../appSlice';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  button: {
    backgroundColor: '#FFFFFF',
    textTransform: 'none'
  },
  icon: {
    width: '20px',
    height: '20px'
  }
}));

export function Login() {
  const dispatch = useDispatch();
  const signIn = () => dispatch(login());
  const appStatus = useSelector(selectAppStatus);
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
      <Typography variant="h1" align="center" gutterBottom>
        One Book HR
      </Typography>

      {
        appStatus === 'idle' &&
        <LinearProgress />
      }

      {
        (appStatus === 'authenticating' || appStatus === 'unauthenticated') &&
        <Button
          className={classes.button}
          variant="contained"
          startIcon={<img className={classes.icon} alt="Google icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"></img>}
          disabled={appStatus === 'authenticating'}
          onClick={signIn}
        >
          Sign in with Google
        </Button>
      }
    </Grid>
  );
}
