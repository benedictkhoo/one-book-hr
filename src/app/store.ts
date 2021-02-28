import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import appReducer from '../appSlice';
import counterReducer from '../features/counter/counterSlice';
import employeeDetailReducer from '../features/employee/employeeDetailSlice';
import employeeListReducer from '../features/employee/employeeListSlice';
import newEmployeeReducer from '../features/employee/newEmployeeSlice';

export const history = createBrowserHistory();

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  counter: counterReducer,
  employeeList: employeeListReducer,
  newEmployee: newEmployeeReducer,
  employeeDetail: employeeDetailReducer
});

export const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
