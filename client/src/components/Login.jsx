import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';

const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogin } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-purple-950/30 transition-colors flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.form
        className="relative bg-white p-10 rounded-xl text-slate-800 shadow-xl"
        initial={{ opacity: 0.2 }}
        transition={{ duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome! Please Sign-In to Continue</p>

        {state !== 'Login' && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <div className="rounded-full shadow-md/0 inset-shadow-sm/0">
              <FontAwesomeIcon icon="fa-regular fa-user" className="" />
            </div>
            <input
              className="outline-none text-sm w-full"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <div className="rounded-full shadow-md/0 inset-shadow-sm/0">
            <FontAwesomeIcon icon="fa-regular fa-envelope" className="" />
          </div>
          <input
            className="outline-none text-sm w-full"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <div className="rounded-full shadow-md/0 inset-shadow-sm/0">
            <FontAwesomeIcon icon="fa-solid fa-lock" className="" />
          </div>
          <input
            className="outline-none text-sm w-full"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="px-1 text-sm text-purple-600 my-4 cursor-pointer">
          Forgot Password?
        </p>

        <button className="bg-purple-400 w-full text-white py-2 rounded-full">
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {state === 'Login' ? (
          <p className="mt-5 text-center">
            Don't Have an Account?{' '}
            <span
              onClick={() => {
                setState('Sign Up');
              }}
              className="text-purple-600 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already Have an Account?{' '}
            <span
              onClick={() => {
                setState('Login');
              }}
              className="text-purple-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
        <div
          onClick={() => {
            setShowLogin(false);
          }}
          className=" rounded-full shadow-md/0 inset-shadow-sm/0 absolute top-5 right-5 cursor-pointer"
        >
          <FontAwesomeIcon icon="fa-solid fa-close" className="" />
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
