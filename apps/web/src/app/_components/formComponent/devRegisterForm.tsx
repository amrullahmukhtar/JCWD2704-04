'use client';

import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import BackEndForm from './backEndForm';

const DevRegisterForm: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({});

  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <BackEndForm
          action="/dev/de1"
          data={input}
          method="post"
          onSuccess={(res) => {
            Swal.fire({
              title: 'Success, Check your email',
              text: 'Welcome',
              icon: 'success',
            });
            router.push('/verification');
          }}
          onFail={() => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to Register',
              icon: 'error',
            });
          }}
        >
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
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
            type="submit"
            value="Register"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          />
        </BackEndForm>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link href="/login">
              <span className="text-blue-500">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevRegisterForm;
