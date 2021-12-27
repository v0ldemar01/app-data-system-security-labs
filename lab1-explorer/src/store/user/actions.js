import { createAsyncThunk } from '@reduxjs/toolkit';
import { createErrorDialog } from 'helpers/dialog.helper';
import { ActionType } from './common';

export const authUser = createAsyncThunk(
  ActionType.AUTH_USER,
  async (credentials, { getState, rejectWithValue }) => {
    const {
      user: {
        userCredentialsConfig
      }
    } = getState();
    const activeCredentials = userCredentialsConfig
      .find(({ role, password }) => role === credentials.role && password === credentials.password);
    if (!activeCredentials) {
      createErrorDialog('Failed authorization into system', 'Incorrect password')
      return rejectWithValue();
    }
    return { activeCredentials };
  }
);

export const deauthUser = createAsyncThunk(
  ActionType.DEAUTH_USER,
  async () => null
);