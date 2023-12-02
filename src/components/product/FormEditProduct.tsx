'use client';

import React, { ChangeEvent, useState } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { Formik, FormikProps } from 'formik';
import { useDispatch } from 'react-redux';
import { useEditProductMutation } from '@/store/apis/productApi';
import { openPopup } from '@/store/slices/popupSlice';
import { Category, FormEditProduct, Product } from '@/types/product';
import { ALLOWED_TYPES } from '@/constants/forms';

interface FormEditProductProps {
  categories: Category[];
  product: Product;
}

const FormEditProduct = ({ categories, product }: FormEditProductProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [editProduct, { isError, error }] = useEditProductMutation();
  const [uploadedFileName, setUploadedFileName] = useState<string>(
    product.image
  );

  const initialValues: FormEditProduct = {
    title: product.title,
    image: null as File | null,
    description: product.description,
    price: product.price,
    category_id: product.category.id,
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required().min(4).max(50),
    image: yup
      .mixed()
      .nullable()
      .test('fileType', 'Only image files are allowed', (value) => {
        if (value === null) {
          return true;
        }

        if (!(value instanceof File)) {
          return false;
        }
        return ALLOWED_TYPES.includes(value.type);
      })
      .test('fileSize', 'File size is too large', (value) => {
        if (value === null) {
          return true;
        }

        if (!(value instanceof File)) {
          return false;
        }
        const maxSizeInBytes = 5 * 1024 * 1024;
        return value.size <= maxSizeInBytes;
      }),
    price: yup
      .number()
      .required('Price is required')
      .positive('Price must be positive')
      .typeError('Price must be a number')
      .test('is-decimal', 'Price must have up to 2 decimal places', (value) => {
        if (!value) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }),
    description: yup.string().required().min(4).max(200),
    category_id: yup.string().required(),
  });

  const handleInputFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    formik: FormikProps<FormEditProduct>
  ) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    formik.setFieldValue('image', file);
    setUploadedFileName(file ? file.name : '');
  };

  const submitForm = async (values: FormEditProduct) => {
    const res = await editProduct({
      ...values,
      image: values.image ?? null,
      id: product.id,
    });
    if ('data' in res) {
      router.refresh();
      dispatch(openPopup('Product has been edited!'));
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
            <h2 className='text-xl text-center mb-10 sm:text-2xl'>
              Edit product
            </h2>
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm sm:text-lg'>Title</label>
              {errors.title && touched.title && (
                <p className='text-red-500 text-xs first-letter:capitalize sm:text-base'>
                  {errors.title}
                </p>
              )}
            </div>
            <input
              name='title'
              type='text'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm sm:text-lg'>Image</label>
              {errors.image && touched.image && (
                <p className='text-red-500 text-xs first-letter:capitalize sm:text-base'>
                  {errors.image}
                </p>
              )}
            </div>
            <label className='flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-4 sm:h-64'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg
                  className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 16'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                  />
                </svg>
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  {uploadedFileName ? (
                    <span className='font-semibold'>{uploadedFileName}</span>
                  ) : (
                    <>
                      <span>
                        <span className='font-semibold'>Click to upload</span>{' '}
                        or drag and drop
                      </span>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        PNG, JPG, JPEG, WEBP (MAX. 5MB)
                      </p>
                    </>
                  )}
                </p>
              </div>
              <input
                id='dropzone-file'
                type='file'
                className='hidden'
                name='image'
                accept='.png, .jpeg, .jpg, .webp'
                onChange={(event) => handleInputFileChange(event, formik)}
              />
            </label>
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm sm:text-lg'>Description</label>
              {errors.description && touched.description && (
                <p className='text-red-500 text-xs first-letter:capitalize sm:text-base'>
                  {errors.description}
                </p>
              )}
            </div>
            <input
              name='description'
              type='text'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm sm:text-lg'>Price</label>
              {errors.price && touched.price && (
                <p className='text-red-500 text-xs first-letter:capitalize sm:text-base'>
                  {errors.price}
                </p>
              )}
            </div>
            <input
              name='price'
              type='number'
              step={0.01}
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
            <div className='flex justify-between items-center mb-3'>
              <label className='text-sm sm:text-lg'>Category</label>
              {errors.category_id && touched.category_id && (
                <p className='text-red-500 text-xs first-letter:capitalize sm:text-base'>
                  {errors.category_id}
                </p>
              )}
            </div>
            <select
              name='category_id'
              value={values.category_id}
              onChange={handleChange}
              onBlur={handleBlur}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            >
              <option value=''>Choose category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button className='bg-yellow-500 w-full py-2 rounded-md hover:bg-yellow-800 transition-all duration-500 text-white mb-2 sm:text-lg'>
              Edit product
            </button>
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

export default FormEditProduct;
