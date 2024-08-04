'use client';
import Link from 'next/link';
import BackEndForm from './backEndForm';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/_lib/redux/hooks';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/app/_lib/firebase/firebase';
import Swal from 'sweetalert2';
import csrMainApi from '@/app/_lib/axios/csrMainApi';
import { adminDataAction } from '@/app/_lib/redux/slices/adminData.slice';
import { devDataAction } from '@/app/_lib/redux/slices/devData.slice';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';
import Image from 'next/image'; // Import the Image component

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({});

  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const dispatch = useAppDispatch();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { email } = result.user;

      const response = await csrMainApi().post('user/v2/bygoogle', { email });

      console.log(response.data.data);
      Swal.fire({
        title: 'Success',
        text: 'Welcome back!',
        icon: 'success',
      });

      dispatch(userDataAction.loginUser(response.data.data));
      console.log(response.data.data);
      router.push('/');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <BackEndForm
          data={input}
          action="/user/v2"
          method="post"
          onSuccess={(response) => {
            if (response.data.data.role === 'user') {
              dispatch(userDataAction.loginUser(response.data.data));
              router.push("/")
            } else if (response.data.data.role === 'admin') {
              dispatch(adminDataAction.loginAdmin(response.data.data));
              router.push("/admin")
            } else if (response.data.data.role === 'developer') {
              dispatch(devDataAction.loginDeveloper(response.data.data));
              router.push("/dev")
            }

            Swal.fire({
              title: 'Success',
              text: 'Welcome back!',
              icon: 'success',
            });
          }}
          onFail={(err) => {
            Swal.fire({
              title: 'Error',
              text: 'Login Fail. Please try again.',
              icon: 'error',
            });
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              name="password"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            />
          </div>
          <input
            value={'Login'}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          />
        </BackEndForm>
        <div className="mt-4 text-center">
          <p>
            Don&lsquo;t have an account?{' '}
            <Link href="/register" legacyBehavior>
              <a className="text-blue-500">Register</a>
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p>
            <Link href="/forgot" legacyBehavior>
              <a className="text-blue-500">Forgot Password?</a>
            </Link>
          </p>
        </div>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-white text-gray-700 py-2 rounded mt-4 border border-gray-300 hover:bg-gray-100 transition duration-200 flex items-center justify-center"
        >
          <Image
            src="/google.svg" // Path to the Google icon image
            alt="Google Icon"
            width={24} // Set the width of the image
            height={24} // Set the height of the image
            className="mr-2" // Add margin-right to align with the text
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
