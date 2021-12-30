import { configureStore } from '@reduxjs/toolkit';
import { fsReducer, userReducer } from './root-reducer';

const store = configureStore({
  reducer: {
    fs: fsReducer,
    user: userReducer
  }
});

export default store;
