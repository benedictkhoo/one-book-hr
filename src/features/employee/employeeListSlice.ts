import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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
  // Mock data
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
    return [
      {
        id: '123',
        firstName: 'John',
        middleInitial: '',
        lastName: 'Doe',
        dateOfBirth: new Date().toDateString(),
        dateOfEmployment: new Date().toDateString(),
        status: true
      },
      {
        id: '456',
        firstName: 'Jane',
        middleInitial: '',
        lastName: 'Doe',
        dateOfBirth: new Date().toDateString(),
        dateOfEmployment: new Date().toDateString(),
        status: true
      }
    ];
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
      state.employees = state.employees.concat(action.payload);
    });

    builder.addCase(loadEmployees.rejected, state => {
      state.status = 'failed';
    });
  }
});

export const selectStatus = (state: RootState) => state.employeeList.status;

export const selectEmployees = (state: RootState) => state.employeeList.employees;

export default employeeListSlice.reducer;
