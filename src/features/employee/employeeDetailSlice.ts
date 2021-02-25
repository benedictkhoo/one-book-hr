import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

interface Input<T> {
  value: T;
  valid: boolean;
}

interface EmployeeDetailState {
  firstName: Input<string>;
  middleInitial: Input<string>;
  lastName: Input<string>;
  dateOfBirth: Input<string>;
  dateOfEmployment: Input<string>;
  employmentStatus: Input<boolean>;
  snackbar: boolean;
  status: 'idle' | 'loading' | 'ready' | 'saving' | 'succeeded' | 'failed';
}

const initialState: EmployeeDetailState = {
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
  employmentStatus: {
    value: true,
    valid: true
  },
  snackbar: false,
  status: 'idle'
};

export const loadEmployee = createAsyncThunk<Employee>('loadEmployee', async () => {
  // Mock data
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
    return {
      id: '123',
      firstName: 'John',
      middleInitial: '',
      lastName: 'Doe',
      dateOfBirth: new Date().toISOString().split('T')[0],
      dateOfEmployment: new Date().toISOString().split('T')[0],
      status: true
    };
  });
});

export const saveEmployee = createAsyncThunk('saveEmployee', async (_, { dispatch, getState }) => {
  // Mock request
  dispatch(validateForm());

  const state = getState() as RootState;
  const { firstName, lastName, dateOfBirth, dateOfEmployment } = state.employeeDetail;
  const isFormValid = firstName.valid && lastName.valid && dateOfBirth.valid && dateOfEmployment.valid;

  if (isFormValid) {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
  }
});

export const employeeDetailSlice = createSlice({
  name: 'employeeDetail',
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
    updateEmploymentStatus: (state, action: PayloadAction<boolean>) => {
      state.employmentStatus.value = action.payload;
    },
    validateForm: (state) => {
      state.firstName.valid = state.firstName.value !== '';
      state.lastName.valid = state.lastName.value !== '';
      state.dateOfBirth.valid = state.dateOfBirth.value !== '';
      state.dateOfEmployment.valid = state.dateOfEmployment.value !== '';
    }
  },
  extraReducers: builder => {
    builder.addCase(loadEmployee.pending, state => {
      state.status = 'loading';
      state.snackbar = false;
    });

    builder.addCase(loadEmployee.fulfilled, (state, action) => {
      state.firstName.value = action.payload.firstName;
      state.middleInitial.value = action.payload.middleInitial;
      state.lastName.value = action.payload.lastName;
      state.dateOfBirth.value = action.payload.dateOfBirth;
      state.dateOfEmployment.value = action.payload.dateOfEmployment;
      state.employmentStatus.value = action.payload.status;
      state.status = 'ready';
      state.snackbar = false;
    });

    builder.addCase(loadEmployee.rejected, state => {
      state.status = 'failed';
      state.snackbar = false;
    });

    builder.addCase(saveEmployee.pending, state => {
      state.status = 'saving';
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

export const {
  closeSnackbar,
  updateFirstName,
  updateMiddleInitial,
  updateLastName,
  updateDateOfBirth,
  updateDateOfEmployment,
  updateEmploymentStatus
} = employeeDetailSlice.actions;

const { validateForm } = employeeDetailSlice.actions;

export const selectStatus = (state: RootState) => state.employeeDetail.status;

export const selectSnackbar = (state: RootState) => state.employeeDetail.snackbar;

export const selectFirstNameValidity = (state: RootState) => state.employeeDetail.firstName.valid;

export const selectFirstNameValue = (state: RootState) => state.employeeDetail.firstName.value;

export const selectMiddleInitialValue = (state: RootState) => state.employeeDetail.middleInitial.value;

export const selectLastNameValidity = (state: RootState) => state.employeeDetail.lastName.valid;

export const selectLastNameValue = (state: RootState) => state.employeeDetail.lastName.value;

export const selectDateOfBirthValidity = (state: RootState) => state.employeeDetail.dateOfBirth.valid;

export const selectDateOfBirthValue = (state: RootState) => state.employeeDetail.dateOfBirth.value;

export const selectDateOfEmploymentValidity = (state: RootState) => state.employeeDetail.dateOfEmployment.valid;

export const selectDateOfEmploymentValue = (state: RootState) => state.employeeDetail.dateOfEmployment.value;

export const selectEmploymentStatusValue = (state: RootState) => {
  return state.employeeDetail.employmentStatus.value ? 'true' : 'false';
}

export default employeeDetailSlice.reducer;
