'use client';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/slices/configSlice';
import React, { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (state: RootState) => state.config.isDarkTheme
  );

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`dark-mode`}>
      <button
        onClick={handleToggleTheme}
        className={`theme-toggle-button transition duration-500 w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 pointer flex justify-center items-center`}
      >
        {isDarkTheme ? <FaSun size={22} /> : <FaMoon size={22} />}
      </button>
    </div>
  );
};

export default ThemeToggler;
