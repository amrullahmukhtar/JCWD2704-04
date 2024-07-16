/** @format */

import { configureStore } from '@reduxjs/toolkit';

import userDataSlice from './slices/userData.slice';
import adminDataSlice from './slices/adminData.slice';
import devDataSlice from './slices/devData.slice';

export const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
    adminData: adminDataSlice.reducer,
    devData: devDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
