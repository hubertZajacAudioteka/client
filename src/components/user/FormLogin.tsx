'use client';

import React from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Link from 'next/link';
import { UserFormLogin } from '@/types/user';
import { useLoginMutation } from '@/store/apis/userApi';
import { setLoggedUser } from '@/store/slices/userSlice';

const FormLogin = () => {
  const [login, { error, isError }] = useLoginMutation();
  const dispatch = useDispatch();

  const initialValues: UserFormLogin = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email().min(4).max(50),
    password: yup.string().required().min(4).max(50),
  });

  const submitForm = async (values: UserFormLogin) => {
    const res = await login(values);
    if ('data' in res) {
      dispatch(setLoggedUser(res.data.user));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        } = formik;
        return (
          <form
            onSubmit={handleSubmit}
            noValidate
            className='w-full border border-gray-400 rounded-md px-3 py-8 md:px-5 md:py-12 relative'
          >
            <h2 className='text-xl text-center mb-10 sm:text-2xl'>Login</h2>
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm sm:text-lg'>Email</label>
              {errors.email && touched.email && (
                <p className='text-red-500 text-xs first-letter:capitalize sm:text-base'>
                  {errors.email}
                </p>
              )}
            </div>
            <input
              name='email'
              type='text'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2 sm:text-lg'
            />
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm sm:text-lg'>Password</label>
              {errors.password && touched.password && (
                <p className='text-red-500 text-xs first-letter:capitalize sm:text-base'>
                  {errors.password}
                </p>
              )}
            </div>
            <input
              name='password'
              type='text'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2 sm:text-lg'
            />
            <button className='bg-yellow-500 w-full py-2 rounded-md hover:bg-yellow-800 transition-all duration-500 text-white mb-2 sm:text-lg'>
              Login
            </button>
            <p className='text-center text-sm sm:text-lg'>
              Don&apos;t have an account?
              <Link href='/register'>
                <span className='ml-1 font-semibold'>Signup</span>
              </Link>
            </p>
            {isError && error && 'status' in error && 'data' in error && (
              <p className='text-red-500 text-xs first-letter:capitalize sm:text-base absolute bottom-3 left-1/2 translate-x-[-50%]'>
                {(error.data as { error: string }).error}
              </p>
            )}
          </form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;
