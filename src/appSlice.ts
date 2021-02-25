import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const login = createAsyncThunk('login', async () => {
  const profile = new firebase.auth.GoogleAuthProvider();

  profile.addScope('https://www.googleapis.com/auth/userinfo.profile');

  return firebase.auth().signInWithPopup(profile).then<User>(credential => {
    return {
      displayName: credential.user?.displayName || '',
      photoUrl: credential.user?.photoURL || ''
    };
  });
});

export const logout = createAsyncThunk('logout', async () => {
  firebase.auth().signOut();
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadUser: (state) => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        state.user = {
          displayName: currentUser.displayName || '',
          photoUrl: currentUser.photoURL || ''
        };
      }

      state.status = !currentUser ? 'unauthenticated' : 'authenticated';
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state) => {
      state.status = 'authenticating';
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'authenticated';
    });

    builder.addCase(login.rejected, (state) => {
      state.status = 'unauthenticated';
    });
  }
});

export const { loadUser } = appSlice.actions;

export const selectCurrentUser = (state: RootState) => state.app.user;

export const selectAppStatus = (state: RootState) => state.app.status;

export default appSlice.reducer;
