'use client';
import { RootState } from '@/store';
import {
  addProductToEditedOrder,
  removeProductFromEditedOrder,
  setOrderToEdit,
} from '@/store/slices/editOrderSlice';
import { Order } from '@/types/order';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderedProductCard from './OrderedProductCard';
import Image from 'next/image';
import { getImageSrc } from '@/utlis/getImageSrc';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import editOrderSlice from '../../store/slices/editOrderSlice';
import { getOrderValue } from '@/utlis/getOrderValue';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useEditOrderMutation } from '@/store/apis/orderApi';
import SpinnerBtn from '../ui/SpinnerBtn';
import { useRouter } from 'next/navigation';
import { openPopup } from '@/store/slices/popupSlice';

interface EditOrderCardProps {
  order: Order;
}

const EditOrderCard = ({ order }: EditOrderCardProps) => {
  const [editOrder, { isLoading, isError, error }] = useEditOrderMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const orderToEdit =
    useSelector((state: RootState) => state.editOrder.orderToEdit) ?? null;
  const [date, setDate] = useState(new Date(order.created_at));

  useEffect(() => {
    dispatch(setOrderToEdit(order));
  }, []);

  const handleEditOrder = async () => {
    const products = orderToEdit?.order_items.map((orderItem) => {
      return {
        id: orderItem.product.id,
        quantity: orderItem.quantity,
      };
    });

    const res = await editOrder({
      id: order.id,
      created_at: date,
      products: products!,
    });

    if ('data' in res) {
      router.refresh();
      dispatch(openPopup('Order has been edited!'));
    }
  };

  if (!orderToEdit?.order_items.length) {
    return (
      <div className='max-w-xl mx-auto'>
        <h2 className='font-semibold text-xl text-center mb-5'>
          Order is empty
        </h2>{' '}
        <button className='bg-yellow-500 w-full py-2 rounded-md hover:bg-yellow-800 transition-all duration-500 text-white mb-2 sm:text-lg relative'>
          Delete order
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto'>
      <h2 className='mb-2 text-center md:text-xl'>
        <span className='font-semibold mr-1 '>Order value:</span>
        {getOrderValue(orderToEdit?.order_items!)}€
      </h2>
      <div className=' mb-3 text-center'>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date!)}
          maxDate={moment().toDate()}
          className='bg-yellow-500 border border-gray-300 text-base text-white rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholderText='Select date'
        />
      </div>
      <div>
        <ul>
          {orderToEdit?.order_items.map((orderItem) => (
            <li key={orderItem?.product.id} className='mb-4'>
              <div className='flex gap-2'>
                <div className='w-1/2 h-36 sm:h-52'>
                  <Image
                    src={getImageSrc(orderItem.product.image)}
                    alt={orderItem.product.title}
                    width={150}
                    height={150}
                  />
                </div>
                <div className='w-1/2 flex flex-col justify-between p-2'>
                  <div className='mb-3'>
                    <h3 className='capitalize text-base mb-2 font-semibold sm:text-xl'>
                      {orderItem.product.title}
                    </h3>
                    <p className='text-sm sm:text-lg'>
                      <span className='font-semibold mr-2'>Price:</span>
                      {orderItem.product.price.toFixed(2)}€
                    </p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                      <div>
                        <div
                          className='cursor-pointer'
                          onClick={() =>
                            dispatch(addProductToEditedOrder(orderItem.product))
                          }
                        >
                          <BiSolidUpArrow />
                        </div>
                        <div
                          className='cursor-pointer'
                          onClick={() =>
                            dispatch(
                              removeProductFromEditedOrder(orderItem.product.id)
                            )
                          }
                        >
                          <BiSolidDownArrow />
                        </div>
                      </div>
                      <p className='text-lg font-semibold sm:text-xl'>
                        {orderItem.quantity}
                      </p>
                    </div>
                    <div>
                      <h4 className='font-semibold'>
                        {(orderItem.product.price * orderItem.quantity).toFixed(
                          2
                        )}
                        €
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleEditOrder}
        className='bg-yellow-500 w-full py-2 rounded-md hover:bg-yellow-800 transition-all duration-500 text-white mb-2 sm:text-lg relative'
      >
        Edit order
        {isLoading && <SpinnerBtn />}
      </button>
      {isError && error && 'status' in error && 'data' in error && (
        <p className='text-red-500 text-xs first-letter:capitalize sm:text-base my-4 text-center'>
          {(error.data as { error: string }).error}
        </p>
      )}
    </div>
  );
};

export default EditOrderCard;
