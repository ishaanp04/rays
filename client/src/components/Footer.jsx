import React from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <div className="flex items-center justify-between px-64 gap-4 py-3 mt-20">
      <div className="flex items-center gap-2" to="/">
        <img
          src={assets.rays_logo}
          alt="rays logo"
          className="w-28 sm:w-28 lg:w-20 "
        />
        <div className="text-4xl font-bold borel-regular text-purple-500">
          rays
        </div>
      </div>
      <p className="flex-1 pl-4 text-sm border-l border-gray-400 text-gray-500 max-sm:hidden">
        Copyright bla bla (Not Really)
      </p>
      <div className="flex gap-2.5">
        <a
          href="https://github.com/ishaanp04"
          target="_blank"
          className="px-[16px] py-[12px] rounded-full text-xl bg-purple-50 drop-shadow-md"
        >
          <FontAwesomeIcon icon="fa-brands fa-github" />
        </a>
        <a
          href="https://instagram.com/ishaanpishaan"
          target="_blank"
          className="px-[16px] py-[12px] rounded-full text-xl bg-purple-50 drop-shadow-md"
        >
          <FontAwesomeIcon icon="fa-brands fa-instagram" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
