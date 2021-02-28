import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { RootState } from './app/store';

interface User {
  displayName: string;
  photoUrl: string;
}

interface AppState {
  user: User | null,
  status: 'idle' | 'authenticating' | 'authenticated' | 'unauthenticated'
}

const initialState: AppState = {
  user: null,
  status: 'idle'
};

export const loadUser = createAsyncThunk('loadUser', async (_, { dispatch }) => {
  return new Promise(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      dispatch(updateUser({
        displayName: currentUser.displayName || '',
        photoUrl: currentUser.photoURL || ''
      }));
      dispatch(push('/employees'));
    }
    else {
      dispatch(updateUser(null));
    }
  });
});

export const login = createAsyncThunk('login', async (_, { dispatch }) => {
  const profile = new firebase.auth.GoogleAuthProvider();

  profile.addScope('https://www.googleapis.com/auth/userinfo.profile');

  return firebase.auth().signInWithPopup(profile).then(credential => {
    const user: User = {
      displayName: credential.user?.displayName || '',
      photoUrl: credential.user?.photoURL || ''
    };

    dispatch(updateUser(user));
    dispatch(push('/employees'));
  });
});

export const logout = createAsyncThunk('logout', async () => {
  firebase.auth().signOut();
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.status = !action.payload ? 'unauthenticated' : 'authenticated';
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state) => {
      state.status = 'authenticating';
    });

    builder.addCase(login.rejected, (state) => {
      state.status = 'unauthenticated';
    });
  }
});

const { updateUser } = appSlice.actions;

export const selectCurrentUser = (state: RootState) => state.app.user;

export const selectAppStatus = (state: RootState) => state.app.status;

export default appSlice.reducer;
