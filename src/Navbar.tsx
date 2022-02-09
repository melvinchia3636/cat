/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-undef */
import { Icon } from '@iconify/react';
import React from 'react';

interface INavbar {
  theme: string;
  setTheme: React.Dispatch<any>
}

const Navbar: React.FC<INavbar> = ({ theme, setTheme }) => (
  <nav className="flex items-center justify-between p-6 z-40 relative">
    <div className="flex items-center gap-3 text-zinc-700 dark:text-white text-xl font-semibold">
      <Icon icon="fluent:animal-cat-24-regular" className="text-yellow-500 w-9 h-9" />
      CAT FACTS
    </div>
    <button type="button" className="bg-yellow-500 p-3 rounded-md shadow-md" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Icon icon={`uil:${theme === 'dark' ? 'moon' : 'sun'}`} className="w-6 h-6 text-zinc-100" />
    </button>
  </nav>
);

export default Navbar;
