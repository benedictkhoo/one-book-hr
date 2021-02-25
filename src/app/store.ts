import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employeeListReducer from '../features/employee/employeeListSlice';
import newEmployeeReducer from '../features/employee/newEmployeeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    employeeList: employeeListReducer,
    newEmployee: newEmployeeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
