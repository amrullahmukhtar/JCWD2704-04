/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/app/_model/user.model';
import { deleteCookie } from 'cookies-next';

type TState = IUser | null;

const initialState = null as TState;

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    loginUser: (state, action: { payload: IUser }) => {
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

export default userDataSlice;
export const userDataAction = userDataSlice.actions;
