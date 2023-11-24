'use client';

import React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
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
  const [editProduct] = useEditProductMutation();

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
          <form onSubmit={handleSubmit} noValidate>
            <div className='flex justify-between items-center mb-3'>
              <label>Title</label>
              {errors.title && touched.title && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
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
              <label>Image</label>
              {errors.image && touched.image && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
                  {errors.image}
                </p>
              )}
            </div>
            <input
              name='image'
              type='file'
              accept='.png, .jpeg, .jpg, .webp'
              onChange={(event) => {
                const file = event.currentTarget.files
                  ? event.currentTarget.files[0]
                  : null;
                formik.setFieldValue('image', file);
              }}
              className='border-b border-solid border-x-0 border-gray-400 border-t-0 w-full mb-10 p-2'
            />
            <div className='flex justify-between items-center mb-3'>
              <label>Description</label>
              {errors.description && touched.description && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
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
              <label>Price</label>
              {errors.price && touched.price && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
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
              <label>Category</label>
              {errors.category_id && touched.category_id && (
                <p className='text-red-500 text-sm first-letter:capitalize'>
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
            <button className='border-black border- border-solid '>
              Edit product
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormEditProduct;
