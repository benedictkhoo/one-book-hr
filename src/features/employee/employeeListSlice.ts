import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase/app';
import 'firebase/firestore';

interface Employee {
  id: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  dateOfEmployment: string;
  status: boolean;
}

interface EmployeeListState {
  employees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: EmployeeListState = {
  employees: [],
  status: 'idle'
};

export const loadEmployees = createAsyncThunk<Employee[]>('loadEmployees', async () => {
  return firebase.firestore().collection('employees').get().then((query) => {
    if (query.empty) {
      return [];
    }

    return query.docs.map<Employee>((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        firstName: data.firstName,
        middleInitial: data.middleInitial,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        dateOfEmployment: data.dateOfEmployment,
        status: data.status
      };
    });
  });
});

export const employeeListSlice = createSlice({
  name: 'employeeList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadEmployees.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(loadEmployees.fulfilled, (state, action) => {
      state.status = 'succeeded';

      if (action.payload.length > 0) {
        state.employees = state.employees.concat(action.payload);
      }
    });

    builder.addCase(loadEmployees.rejected, state => {
      state.status = 'failed';
    });
  }
});

export const selectStatus = (state: RootState) => state.employeeList.status;

export const selectEmployees = (state: RootState) => state.employeeList.employees;

export default employeeListSlice.reducer;
