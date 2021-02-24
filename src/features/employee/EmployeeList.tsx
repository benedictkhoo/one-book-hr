import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEmployees, selectEmployees, selectStatus } from './employeeListSlice';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export function EmployeeList() {
  const status = useSelector(selectStatus);
  const employees = useSelector(selectEmployees);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (status === 'idle' && employees.length === 0) {
      dispatch(loadEmployees());
    }
  });

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.grow} variant="h6">
            Employees
          </Typography>

          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
        {
          status === 'loading' &&
          <LinearProgress />
        }
      </AppBar>

      <Container component="main">
        {
          status !== 'loading' && employees.length > 0 &&
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Middle Initial</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Date of Employment</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.middleInitial}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.dateOfBirth}</TableCell>
                      <TableCell>{employee.dateOfEmployment}</TableCell>
                      <TableCell>{employee.status ? 'Active' : 'Inactive'}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Container>

      <Fab className={classes.fab} color="primary">
        <AddIcon />
      </Fab>
    </>
  );
}
