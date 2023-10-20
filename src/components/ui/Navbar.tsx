'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const itemsQuantity = useSelector(
    (state: RootState) => state.order.itemsQuantity
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className=' bg-gray-600 relative mb-5'>
      <div className='h-12 mx-3 pt-3 flex justify-between items-center text-slate-50 max-w-[1500px] 2xl:m-auto'>
        <div>
          <Link href='/'>LOGO</Link>
        </div>
        {loggedUser && (
          <div className='flex flex-col items-center justify-center gap-1'>
            <p>
              {loggedUser.first_name} {loggedUser.last_name}
            </p>
            <Link href={'/orders/new'}>
              <div className='relative cursor-pointer'>
                <AiOutlineShoppingCart size={20} />
                <span className='absolute bottom-2 left-4 text-green-400 font-semibold'>
                  {itemsQuantity}
                </span>
              </div>
            </Link>
          </div>
        )}
        <div className='cursor-pointer text-white md:hidden'>
          {!isOpen ? (
            <BiMenuAltLeft size={30} onClick={() => setIsOpen(true)} />
          ) : (
            <AiOutlineClose
              color='white'
              size={24}
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>

        <nav
          className={`bg-slate-400 transition-all duration-500 absolute p-4 top-0 ${
            isOpen ? 'left-0' : 'left-[-120px]'
          } w-[120px] h-[100px] z-10  md:static md:w-auto md:h-auto md:bg-transparent`}
        >
          <ul className='flex flex-col gap-2 items-center py-4 md:flex-row'>
            <li className='hover:text-red-200'>
              <Link href='/products?page=1'>Products</Link>
            </li>
            <li>
              <Link href='/orders'>Orders</Link>
            </li>
          </ul>
        </nav>
      </div>
      <button onClick={handleLogout}>LOGOUT</button>
    </header>
  );
};

export default Navbar;
