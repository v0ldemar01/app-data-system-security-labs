import { createReducer } from '@reduxjs/toolkit';
import * as userActions from './actions';

const initialState = {
  userCredentialsConfig: [
    {
      role: 'user',
      password: 'userPass',
      permissions: [
        {
          path: 'A://',
          allow: []
        },
        {
          path: 'B://',
          allow: ['R', 'X'] // folder: RWX, RX, null
        }
      ]
    },
    {
      role: 'admin',
      password: 'adminPass',
      permissions: [
        {
          path: 'A://',
          allow: ['R', 'W', 'X']
        },
        {
          path: 'B://',
          allow: ['R', 'W', 'X']
        },
        {
          path: 'C://',
          allow: ['R', 'W', 'X']
        }
      ]
    }
  ],
  activeCredentials: null
};

export const reducer = createReducer(initialState, builder => {
  builder.addCase(userActions.authUser.fulfilled, (state, action) => {
    const { activeCredentials } = action.payload;

    state.activeCredentials = activeCredentials;
  });

  builder.addCase(userActions.deauthUser.pending, state => {
    state.activeCredentials = null;
  });
});
