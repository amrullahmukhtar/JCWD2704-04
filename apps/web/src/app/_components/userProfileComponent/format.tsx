// src/pages/profile.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_lib/redux/hooks';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import { adminDataAction } from '@/app/_lib/redux/slices/adminData.slice';
import { devDataAction } from '@/app/_lib/redux/slices/devData.slice';
import Swal from 'sweetalert2';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await verifyToken();

        if (userData.role === 'user') {
          dispatch(userDataAction.loginUser(userData));
        } else if (userData.role === 'admin') {
          dispatch(adminDataAction.loginAdmin(userData));
        } else if (userData.role === 'developer') {
          dispatch(devDataAction.loginDeveloper(userData));
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to verify token:', error);
        Swal.fire({
          title: 'Error',
          text: 'Session expired. Please log in again.',
          icon: 'error',
        });
        router.push('/login');
      }
    };

    fetchUserData();
  }, [dispatch, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {user && (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Full Name:</strong> {user.fullname}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
