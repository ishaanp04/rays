import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, logout, credit } = useContext(AppContext);

  return (
    <div className="flex justify-around gap-48 pt-14  items-center bg-gradient-to-b from-purple-200 to-purple-50">
      <Link className="flex items-center gap-2" to="/">
        <img
          src={assets.rays_logo}
          alt="rays logo"
          className="w-28 sm:w-28 lg:w-20 "
        />
        <div className="text-4xl font-bold borel-regular text-purple-500">
          rays
        </div>
      </Link>

      <div className="align-middle">
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                navigate('/buy');
              }}
              className="flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full bg-purple-300 hover:scale-105 transition-all duration-75 ease-in-out"
            >
              <FontAwesomeIcon
                className="text-yellow-500"
                icon="fa-solid fa-bolt"
                // style={{ color: '#63E6BE' }}
              />
              <p className="text-xs sm:text-sm font-medium text-gray-800">
                Credits Left: {credit}
              </p>
            </button>
            <p className="max-sm:hidden pl-4 text-gray-800">Hi, {user}</p>
            <div className="relative group">
              <div className="px-2.5 py-1 rounded-full shadow-md/15 inset-shadow-sm">
                <FontAwesomeIcon icon="fa-solid fa-user" className="" />
              </div>
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border border-neutral-200/60 text-sm">
                  <li
                    onClick={logout}
                    className="py-1 px-2 cursor-pointer pr-10"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => {
                navigate('/buy');
              }}
              className="cursor-pointer"
            >
              Pricing
            </p>
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className="cursor-pointer bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
