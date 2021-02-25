import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeSnackbar,
  saveEmployee,
  selectDateOfBirthValidity,
  selectDateOfEmploymentValidity,
  selectFirstNameValidity,
  selectLastNameValidity,
  selectSnackbar,
  selectStatus,
  updateDateOfBirth,
  updateDateOfEmployment,
  updateFirstName,
  updateLastName,
  updateMiddleInitial
} from './newEmployeeSlice';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  backButton: {
    marginRight: theme.spacing(2)
  }
}));

export function NewEmployee() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const snackbar = useSelector(selectSnackbar);
  const firstNameValid = useSelector(selectFirstNameValidity);
  const lastNameValid = useSelector(selectLastNameValidity);
  const dateOfBirthValid = useSelector(selectDateOfBirthValidity);
  const dateOfEmploymentValid = useSelector(selectDateOfEmploymentValidity);
  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFirstName(event.target.value));
  };
  const handleMiddleInitialChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateMiddleInitial(event.target.value));
  };
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateLastName(event.target.value));
  };
  const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDateOfBirth(event.target.value));
  };
  const handleDateOfEmploymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDateOfEmployment(event.target.value));
  };
  const save = () => dispatch(saveEmployee());
  const dismissSnackbar = () => dispatch(closeSnackbar());
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton className={classes.backButton} edge="start" color="inherit">
            <ArrowBackIcon />
          </IconButton>

          <Typography className={classes.grow} variant="h6">
            New Employee
          </Typography>

          <Button
            color="inherit"
            disabled={status === 'loading'}
            onClick={save}
          >
            Save
          </Button>
        </Toolbar>
        {
          status === 'loading' &&
          <LinearProgress />
        }
      </AppBar>

      <Container component="main" maxWidth="sm">
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            InputLabelProps={{ shrink: true }}
            disabled={status === 'loading'}
            error={!firstNameValid}
            onChange={handleFirstNameChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="middleInitial"
            label="Middle Initial"
            name="middleInitial"
            InputLabelProps={{ shrink: true }}
            disabled={status === 'loading'}
            onChange={handleMiddleInitialChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            InputLabelProps={{ shrink: true }}
            disabled={status === 'loading'}
            error={!lastNameValid}
            onChange={handleLastNameChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="date"
            id="dateOfBirth"
            label="Date of Birth"
            name="dateOfBirth"
            InputLabelProps={{ shrink: true }}
            disabled={status === 'loading'}
            error={!dateOfBirthValid}
            onChange={handleDateOfBirthChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="date"
            id="dateOfEmployment"
            label="Date of Employment"
            name="dateOfEmployment"
            InputLabelProps={{ shrink: true }}
            disabled={status === 'loading'}
            error={!dateOfEmploymentValid}
            onChange={handleDateOfEmploymentChange}
          />
        </form>
      </Container>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={status === 'failed' && snackbar}
        autoHideDuration={3000}
        message="Failed to add a new employee."
        action={
          <Button color="secondary" size="small" onClick={dismissSnackbar}>
            OK
          </Button>
        }
      />
    </>
  );
}
