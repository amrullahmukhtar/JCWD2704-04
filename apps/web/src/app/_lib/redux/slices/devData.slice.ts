/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { IDeveloper } from '@/app/_model/user.model';
import { deleteCookie } from 'cookies-next';

type TState = IDeveloper | null;

const initialState = null as TState;

const devDataSlice = createSlice({
  name: 'devData',
  initialState,
  reducers: {
    loginDeveloper: (state, action: { payload: IDeveloper }) => {
      return action.payload;
    },
    logout: (state, action: { payload: any; type: string }) => {
      state = initialState;
      deleteCookie('rauth');
      deleteCookie('aauth');

      return state;
    },
  },
});

export default devDataSlice;
export const devDataAction = devDataSlice.actions;
