import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeSnackbar,
  loadEmployee,
  saveEmployee,
  selectDateOfBirthValidity,
  selectDateOfBirthValue,
  selectDateOfEmploymentValidity,
  selectDateOfEmploymentValue,
  selectEmploymentStatusValue,
  selectFirstNameValidity,
  selectFirstNameValue,
  selectLastNameValidity,
  selectLastNameValue,
  selectMiddleInitialValue,
  selectSnackbar,
  selectStatus,
  updateDateOfBirth,
  updateDateOfEmployment,
  updateEmploymentStatus,
  updateFirstName,
  updateLastName,
  updateMiddleInitial
} from './employeeDetailSlice';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  backButton: {
    marginRight: theme.spacing(2)
  }
}));

export function EmployeeDetail() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const isIdle = status === 'idle';
  const snackbar = useSelector(selectSnackbar);
  const firstNameValid = useSelector(selectFirstNameValidity);
  const firstNameValue = useSelector(selectFirstNameValue);
  const middleInitialValue = useSelector(selectMiddleInitialValue);
  const lastNameValid = useSelector(selectLastNameValidity);
  const lastNameValue = useSelector(selectLastNameValue);
  const dateOfBirthValid = useSelector(selectDateOfBirthValidity);
  const dateOfBirthValue = useSelector(selectDateOfBirthValue);
  const dateOfEmploymentValid = useSelector(selectDateOfEmploymentValidity);
  const dateOfEmploymentValue = useSelector(selectDateOfEmploymentValue);
  const employmentStatusValue = useSelector(selectEmploymentStatusValue);
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
  const handlEmploymentStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmploymentStatus(event.target.value === 'true'));
  };
  const save = () => dispatch(saveEmployee());
  const dismissSnackbar = () => dispatch(closeSnackbar());
  const classes = useStyles();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadEmployee(''));
    }
  });

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton className={classes.backButton} edge="start" color="inherit">
            <ArrowBackIcon />
          </IconButton>

          <Typography className={classes.grow} variant="h6">
            Employee Detail
          </Typography>

          <Button
            color="inherit"
            disabled={status === 'idle' || status === 'loading' || status === 'saving'}
            onClick={save}
          >
            Save
          </Button>
        </Toolbar>
        {
          (status === 'loading' || status === 'saving') &&
          <LinearProgress />
        }
      </AppBar>

      <Container component="main" maxWidth="sm">
        {
          !isIdle &&
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
              value={firstNameValue}
              disabled={status === 'saving'}
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
              value={middleInitialValue}
              disabled={status === 'saving'}
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
              value={lastNameValue}
              disabled={status === 'saving'}
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
              value={dateOfBirthValue}
              disabled={status === 'saving'}
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
              value={dateOfEmploymentValue}
              disabled={status === 'saving'}
              error={!dateOfEmploymentValid}
              onChange={handleDateOfEmploymentChange}
            />

            <FormControl component="fieldset" disabled={status === 'saving'}>
              <FormLabel component="legend">Status</FormLabel>

              <RadioGroup name="status" value={employmentStatusValue} onChange={handlEmploymentStatusChange}>
                <FormControlLabel value="true" control={<Radio />} label="Active" />
                <FormControlLabel value="false" control={<Radio />} label="Inactive" />
              </RadioGroup>
            </FormControl>
          </form>
        }
      </Container>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={status === 'failed' && snackbar}
        autoHideDuration={3000}
        message="Failed to update employee detail."
        action={
          <Button color="secondary" size="small" onClick={dismissSnackbar}>
            OK
          </Button>
        }
      />
    </>
  );
}
