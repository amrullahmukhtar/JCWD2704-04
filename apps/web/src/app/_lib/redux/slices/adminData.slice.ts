/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { IAdmin} from '@/app/_model/user.model';
import { deleteCookie } from 'cookies-next';

type TState =  IAdmin | null;

const initialState = null as TState;

const adminDataSlice = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    loginAdmin: (state, action: { payload: IAdmin }) => {
      state = action.payload;
      console.log(state);

      return state
    },

    logout: (state, action: { payload: any; type: string }) => {
      state = initialState;
      deleteCookie('rauth');
      deleteCookie('aauth');

      return state;
    },
  },
});

export default adminDataSlice;
export const adminDataAction = adminDataSlice.actions;
