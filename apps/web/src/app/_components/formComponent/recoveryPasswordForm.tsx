'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Use this hook to get search parameters
import BackEndForm from './backEndForm';
import Swal from 'sweetalert2';

const RecoveryPasswordForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to access query parameters
  const token = searchParams.get('token') || ''; // Get token from URL
  const [input, setInput] = useState({ token: token, password: '' });

  useEffect(() => {
    if (token) {
      setInput((prevInput) => ({ ...prevInput, token }));
    }
  }, [token]);

  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Recovery Password</h2>
        <BackEndForm
          data={input}
          action="/user/recovery"
          method="patch"
          onSuccess={() => {
            Swal.fire({
              title: 'Success, Password reset successful',
              text: 'Welcome',
              icon: 'success',
            });
            router.push('/login');
          }}
          onFail={() => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to reset password',
              icon: 'error',
            });
          }}
        >
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            />
          </div>
          <input
            value="Reset Password"
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          />
        </BackEndForm>
      </div>
    </div>
  );
};

export default RecoveryPasswordForm;
