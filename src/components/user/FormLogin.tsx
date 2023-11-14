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
          <form onSubmit={handleSubmit} noValidate>
            <div className='flex justify-between items-center mb-3'>
              <label>Email</label>
              {errors.email && touched.email && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
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
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
            <div className='flex justify-between items-center mb-3'>
              <label>Password</label>
              {errors.password && touched.password && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
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
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
            <button className='border-black border- border-solid '>
              Login
            </button>
            <p>
              Don&apos;t have an account?
              <Link href='/register'>
                <span>Signup</span>
              </Link>
            </p>
            {isError && error && 'status' in error && 'data' in error && (
              <p>{(error.data as { error: string }).error}</p>
            )}
          </form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;
