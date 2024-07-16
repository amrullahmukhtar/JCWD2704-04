'use client';

import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth, provider } from '@/app/_lib/firebase/firebase';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import BackEndForm from './backEndForm';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({});

  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = result.user;

      const response = await csrMainApi().post('user/v1/bygoogle', {
        uid,
        email,
        fullname: displayName,
      });


      Swal.fire({
        title: 'Success',
        text: 'Welcome',
        icon: 'success',
      });

      router.push('/verification');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error signing in with Google. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <BackEndForm
          action="/user/v1"
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
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
        <button
          onClick={signInWithGoogle}
          className="w-full bg-white text-gray-700 py-2 rounded mt-4 border border-gray-300 hover:bg-gray-100 transition duration-200 flex items-center justify-center"
        >
          <img src="/google.svg" alt="Google Icon" className="w-6 h-6 mr-2" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
