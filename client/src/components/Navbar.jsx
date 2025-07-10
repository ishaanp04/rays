import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setShowDropdown(false); // close dropdown whenever user changes
  }, [user]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <div className="flex justify-around gap-[45%] min-2xl:gap-100 max-md:px-10 md:pt-14 sm:pt-8 max-sm:pt-6 items-center bg-gradient-to-b from-purple-200 to-purple-50">
      <Link className="flex items-center gap-2" to="/">
        <img src={assets.rays_logo} alt="rays logo" className="w-20 sm:w-18" />
        <div className="text-3xl md:text-4xl max-[500px]:text-2xl font-bold borel-regular text-purple-500">
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
              className="flex items-center gap-2 px-4 md:px-6 py-1.5 sm:py-3 rounded-full bg-purple-300 hover:scale-105 transition-all duration-75 ease-in-out"
            >
              <FontAwesomeIcon
                className="text-yellow-500"
                icon="fa-solid fa-bolt"
                // style={{ color: '#63E6BE' }}
              />
              <p className="text-xsa text-sm font-medium text-gray-800">
                <span className="max-[900px]:hidden">Credits</span>{' '}
                <span className="max-lg:hidden"> Left </span>
                <span className="max-[900px]:hidden">:</span> {credit}
              </p>
            </button>
            <p className="max-[800px]:hidden pl-4 text-gray-800">Hi, {user}</p>
            <div
              className="relative group cursor-pointer"
              onClick={toggleDropdown}
              onMouseLeave={closeDropdown} // optional: close on mouse leave for desktop
            >
              <div className="px-3.5 py-2 rounded-full shadow-md/15 inset-shadow-sm">
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>

              {/* Dropdown */}
              <div
                className={`absolute top-0 right-0 z-10 text-black rounded pt-12 ${
                  showDropdown ? 'block' : 'hidden'
                } group-hover:block`}
              >
                <ul className="list-none m-0 p-2a bg-white rounded-md border border-neutral-200/60 text-sm">
                  <li
                    onClick={() => {
                      logout();
                    }}
                    className="py-2.5 px-4 cursor-pointer pr-10 hover:bg-gray-300 transition-colors duration-200"
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
              className="cursor-pointer max-[500px]:text-xs"
            >
              Pricing
            </p>
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className="cursor-pointer bg-purple-950 text-white px-7 py-2 sm:px-10 max-[500px]:px-4 text-sm max-[500px]:text-xs rounded-full"
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
