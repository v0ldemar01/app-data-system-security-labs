import { createReducer } from '@reduxjs/toolkit';
import * as userActions from './actions';

const initialState = {
  userCredentialsConfig: [
    {
      role: 'user',
      password: 'userPass'
    },
    {
      role: 'admin',
      password: 'adminPass'
    }
  ],
  activeCredentials: null
}

export const reducer = createReducer(initialState, builder => {
  builder.addCase(userActions.authUser.fulfilled, (state, action) => {
    const { activeCredentials } = action.payload;

    state.activeCredentials = activeCredentials;
  });

  builder.addCase(userActions.deauthUser.pending, state => {
    state.activeCredentials = null;
  });
});