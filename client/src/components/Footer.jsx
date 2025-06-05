import React from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <div className="w-full bg-whitea py-6 mt-20">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 md:px-16 lg:px-32 gap-4">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <img
            src={assets.rays_logo}
            alt="rays logo"
            className="w-20 sm:w-24"
          />
          <div className="text-3xl font-bold borel-regular text-purple-500">
            rays
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center sm:text-left sm:border-l sm:pl-6 border-gray-400 max-sm:pt-2">
          © 2025 Rays. All rights reserved. Not Really ;p
        </p>

        {/* Socials */}
        <div className="flex gap-3">
          <a
            href="https://github.com/ishaanp04"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full text-xl bg-purple-50 drop-shadow-md hover:scale-105 transition-transform"
          >
            <FontAwesomeIcon icon="fa-brands fa-github" />
          </a>
          <a
            href="https://instagram.com/ishaanpishaan"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full text-xl bg-purple-50 drop-shadow-md hover:scale-105 transition-transform"
          >
            <FontAwesomeIcon icon="fa-brands fa-instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
