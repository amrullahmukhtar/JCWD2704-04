'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackEndForm from './backEndForm';
import Swal from 'sweetalert2';

const VerifyEmail: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromQuery = searchParams.get('token');
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [searchParams]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Verify Email</h2>
        <BackEndForm
          action="/user/verify-email"
          data={{ token }}
          method="post"
          onSuccess={(res) => {
            Swal.fire({
              title:
                'Success, Email verification successful! You can now log in.',
              text: 'Welcome',
              icon: 'success',
            });
            router.push('/login');
          }}
          onFail={() => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to Verified',
              icon: 'error',
            });
          }}
        >
          <div className="mb-4">
            <label htmlFor="token" className="block text-gray-700">
              Verification Token
            </label>
            <input
              type="text"
              id="token"
              className="w-full px-4 py-2 border rounded mt-2"
              value={token}
              onChange={handleTokenChange}
              required
            />
          </div>
          <input
            type="submit"
            value="Verify Email"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          />
        </BackEndForm>
      </div>
    </div>
  );
};

export default VerifyEmail;
