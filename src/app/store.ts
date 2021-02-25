import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employeeListReducer from '../features/employee/employeeListSlice';
import newEmployeeReducer from '../features/employee/newEmployeeSlice';
import employeeDetailReducer from '../features/employee/employeeDetailSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    employeeList: employeeListReducer,
    newEmployee: newEmployeeReducer,
    employeeDetail: employeeDetailReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
