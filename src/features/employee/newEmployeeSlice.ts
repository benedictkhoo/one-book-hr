import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { RootState } from '../../app/store';

interface Input<T> {
  value: T;
  valid: boolean;
}

interface NewEmployeeState {
  firstName: Input<string>;
  middleInitial: Input<string>;
  lastName: Input<string>;
  dateOfBirth: Input<string>;
  dateOfEmployment: Input<string>;
  snackbar: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: NewEmployeeState = {
  firstName: {
    value: '',
    valid: true
  },
  middleInitial: {
    value: '',
    valid: true
  },
  lastName: {
    value: '',
    valid: true
  },
  dateOfBirth: {
    value: '',
    valid: true
  },
  dateOfEmployment: {
    value: '',
    valid: true
  },
  snackbar: false,
  status: 'idle'
};

export const saveEmployee = createAsyncThunk('saveEmployee', async (_, { dispatch, getState }) => {
  dispatch(validateForm());

  const state = getState() as RootState;
  const { firstName, middleInitial, lastName, dateOfBirth, dateOfEmployment } = state.newEmployee;
  const isFormValid = firstName.valid && lastName.valid && dateOfBirth.valid && dateOfEmployment.valid;

  if (isFormValid) {
    return firebase.firestore().collection('employees').add({
      firstName: firstName.value,
      middleInitial: middleInitial.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      dateOfEmployment: dateOfEmployment.value,
      status: true
    }).then(() => true);
  }
});

export const newEmployeeSlice = createSlice({
  name: 'newEmployee',
  initialState,
  reducers: {
    closeSnackbar: state => {
      state.snackbar = false;
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.firstName.value = action.payload;
      state.firstName.valid = state.firstName.value !== '';
    },
    updateMiddleInitial: (state, action: PayloadAction<string>) => {
      state.middleInitial.value = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.lastName.value = action.payload;
      state.lastName.valid = state.lastName.value !== '';
    },
    updateDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth.value = action.payload;
      state.dateOfBirth.valid = state.dateOfBirth.value !== '';
    },
    updateDateOfEmployment: (state, action: PayloadAction<string>) => {
      state.dateOfEmployment.value = action.payload;
      state.dateOfEmployment.valid = state.dateOfEmployment.value !== '';
    },
    validateForm: (state) => {
      state.firstName.valid = state.firstName.value !== '';
      state.lastName.valid = state.lastName.value !== '';
      state.dateOfBirth.valid = state.dateOfBirth.value !== '';
      state.dateOfEmployment.valid = state.dateOfEmployment.value !== '';
    }
  },
  extraReducers: builder => {
    builder.addCase(saveEmployee.pending, state => {
      state.status = 'loading';
      state.snackbar = false;
    });

    builder.addCase(saveEmployee.fulfilled, state => {
      state.status = 'succeeded';
      state.snackbar = false;
    });

    builder.addCase(saveEmployee.rejected, state => {
      state.status = 'failed';
      state.snackbar = true;
    });
  }
});

export const { closeSnackbar, updateFirstName, updateMiddleInitial, updateLastName, updateDateOfBirth, updateDateOfEmployment } = newEmployeeSlice.actions;

const { validateForm } = newEmployeeSlice.actions;

export const selectStatus = (state: RootState) => state.newEmployee.status;

export const selectSnackbar = (state: RootState) => state.newEmployee.snackbar;

export const selectFirstNameValidity = (state: RootState) => state.newEmployee.firstName.valid;

export const selectLastNameValidity = (state: RootState) => state.newEmployee.lastName.valid;

export const selectDateOfBirthValidity = (state: RootState) => state.newEmployee.dateOfBirth.valid;

export const selectDateOfEmploymentValidity = (state: RootState) => state.newEmployee.dateOfEmployment.valid;

export default newEmployeeSlice.reducer;
