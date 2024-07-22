import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfileSuccess, clearUserProfile } from '@/app/_lib/redux/slices/userProfileSlice';
import { useAppSelector } from '@/app/_lib/redux/store'; // Assuming useAppSelector is correctly implemented
import { IUser } from 'path_to_your_user_interface'; // Adjust path as per your project structure

const UserProfileComponent: React.FC<{ userId: string }> = ({ userId }) => {
  const dispatch = useDispatch();

  // Use useAppSelector to get userData
  const userData = useAppSelector((state) => state.userData);
  const userProfile = userData?.userProfile;
  const loading = userData?.loading;
  const error = userData?.error;

  useEffect(() => {
    if (userId) {
      // Dispatch action to fetch user profile based on userId
      dispatch(fetchUserProfileSuccess(userId));
    }

    return () => {
      // Cleanup function to clear user profile
      dispatch(clearUserProfile());
    };
  }, [dispatch, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No user profile available.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      {/* Display other user profile information as needed */}
    </div>
  );
};

export default UserProfileComponent;
