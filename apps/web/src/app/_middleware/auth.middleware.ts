import { deleteCookie, getCookie } from 'cookies-next';
import { Dispatch } from 'redux';
import { IUser, IAdmin, IDeveloper } from '../_model/user.model';
import { userDataAction } from '../_lib/redux/slices/userData.slice';
import { adminDataAction } from '../_lib/redux/slices/adminData.slice';
import { devDataAction } from '../_lib/redux/slices/devData.slice';
import { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import csrMainApi from '../_lib/axios/csrMainApi';

export const keepLogin = async (dispatch: Dispatch) => {
  try {
    const token = getCookie('aauth'); // Get token from cookie "aauth"
    if (!token) throw new Error('Token not found');

    const fetchValidate = (await csrMainApi().get("/user/validate")).data.data

    const user = jwtDecode<JwtPayload & (IUser | IAdmin | IDeveloper)>(fetchValidate);
    console.log(user, 'masuk');

    if ('role' in user) {
      switch (user.role) {
        case 'user':
          dispatch(userDataAction.loginUser(user as IUser));
          break;
        case 'admin':
          dispatch(adminDataAction.loginAdmin(user as IAdmin));
          break;
        case 'developer':
          dispatch(devDataAction.loginDeveloper(user as IDeveloper));
          break;
        default:
          throw new Error('Unknown user role');
      }
    } else {
      throw new Error('Invalid user data');
    }

    return {
      success: true,
      message: 'Login success',
    };
  } catch (err: any) {
    console.error('Error:', err);
    dispatch(userDataAction.logout({}));
    dispatch(adminDataAction.logout({}));
    dispatch(devDataAction.logout({}));
    return {
      success: false,
      message: err.message || 'An error occurred',
    };
  }
};
