'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useLogoutMutation } from '@/store/apis/userApi';
import { logout } from '@/store/slices/userSlice';
import { BiMenuAltLeft } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { Endpoint } from '@/types/action';
import { FaShopify } from 'react-icons/fa';
import ThemeToggler from './ThemeToggler';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [logoutUser] = useLogoutMutation();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const hasUserEmployeePrivileges =
    loggedUser && loggedUser.role?.name !== 'client';
  const itemsQuantity = useSelector(
    (state: RootState) => state.createOrder.itemsQuantity
  );

  useEffect(() => {
    const closeMenuOnOutsideClick = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as HTMLElement;
        if (target && !target.closest('.navbar-menu')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    router.push('/');
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className='bg-gray-600 fixed h-16 w-full mb-5 z-20'>
      <div className='h-16 mx-3 py-3 relative flex justify-between items-center text-slate-50 max-w-[1500px] 2xl:m-auto'>
        <div className='lg:flex-1'>
          <Link href='/'>
            <FaShopify size={45} />
          </Link>
        </div>

        <div className='flex flex-col items-center justify-center gap-1 w-full lg:flex-1'>
          {loggedUser && (
            <p>
              {loggedUser.first_name} {loggedUser.last_name}
            </p>
          )}
          <Link href={`/${Endpoint.Orders}/new`}>
            <div className='relative cursor-pointer'>
              <AiOutlineShoppingCart size={20} />
              <span className='absolute bottom-2 left-4 text-green-400 font-semibold'>
                {itemsQuantity}
              </span>
            </div>
          </Link>
        </div>

        <div className='cursor-pointer text-white lg:hidden'>
          {!isOpen ? (
            <BiMenuAltLeft size={30} onClick={() => setIsOpen(true)} />
          ) : (
            <AiOutlineClose
              color='white'
              size={30}
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>

        <nav
          className={`bg-slate-400 transition-all duration-500 absolute p-4 top-0 navbar-menu ${
            isOpen ? 'left-[-18px]' : 'left-[-218px]'
          } w-[200px] h-[240px] z-10  lg:static lg:h-auto lg:bg-transparent lg:flex justify-end lg:flex-1`}
        >
          <ul className='flex flex-col gap-2 items-center py-4 lg:flex-row lg:gap-4'>
            <li className='hover:text-red-200'>
              <Link
                onClick={handleLinkClick}
                href={`/${Endpoint.Products}?page=1`}
              >
                Products
              </Link>
            </li>
            {loggedUser && (
              <li className='hover:text-red-200'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${Endpoint.Orders}?page=1`}
                >
                  Orders
                </Link>
              </li>
            )}
            {hasUserEmployeePrivileges && (
              <li className='hover:text-red-200'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${Endpoint.Users}?page=1`}
                >
                  Users
                </Link>
              </li>
            )}
            {hasUserEmployeePrivileges && (
              <li className='hover:text-red-200'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${Endpoint.Sales}?page=1`}
                >
                  Sales
                </Link>
              </li>
            )}
            {loggedUser ? (
              <li>
                <button
                  onClick={handleLogout}
                  className='bg-yellow-500 px-5 py-2 rounded-md hover:bg-yellow-800 transition-all duration-500'
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    router.push('/login');
                    handleLinkClick();
                  }}
                  className='bg-yellow-500 px-5 py-2 rounded-md hover:bg-yellow-800 transition-all duration-500'
                >
                  Log in
                </button>
              </li>
            )}
          </ul>
          <ThemeToggler />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
