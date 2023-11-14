'use client';

import React from 'react';
import * as yup from 'yup';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useLoginMutation, useRegisterMutation } from '@/store/apis/userApi';
import { setLoggedUser } from '@/store/slices/userSlice';
import { UserFormRegister } from '../../types/user';

const FormRegister = () => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const initialValues: UserFormRegister = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required().min(4).max(50),
    last_name: yup.string().required().min(4).max(50),
    email: yup.string().required().email().min(4).max(200),
    password: yup.string().required().min(4).max(50),
  });

  const submitForm = async (values: UserFormRegister) => {
    const res = await register(values);
    if ('data' in res) {
      const res = await login({
        email: values.email,
        password: values.password,
      });
      if ('data' in res) {
        dispatch(setLoggedUser(res.data.user));
      }
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
              <label>First Name</label>
              {errors.first_name && touched.first_name && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
                  {errors.first_name}
                </p>
              )}
            </div>
            <input
              name='first_name'
              type='text'
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
            <div className='flex justify-between items-center mb-3'>
              <label>Last name</label>
              {errors.last_name && touched.last_name && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
                  {errors.last_name}
                </p>
              )}
            </div>
            <input
              name='last_name'
              type='text'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
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
              Register
            </button>
            <p>
              Already have an account?
              <Link href='/login'>
                <span>Sign in</span>
              </Link>
            </p>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormRegister;
