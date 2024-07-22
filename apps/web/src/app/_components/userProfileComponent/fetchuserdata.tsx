import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import { IUser } from '@/app/_model/user.model';
import { Dispatch } from '@reduxjs/toolkit';

export const fetchUserData = async (userId: string, dispatch: Dispatch) => {
  try {
    const response = await csrMainApi().get(`/userdata/${userId}`);
    const data: IUser = response.data;
    dispatch(userDataAction.updateUser(data));
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
