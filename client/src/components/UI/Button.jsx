import React from 'react';
// import { motion } from 'framer-motion';

export const Button = ({ handleButtonClick, disabled, children }) => {
  return (
    <button
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ type: 'ease-in', stiffness: 500, damping: 30 }}
      type="submit"
      onClick={handleButtonClick}
      disabled={disabled}
      className={`absolute flex justify-center items-center right-2 p-2 w-10 h-10 text-white rounded-full transition duration-100 ease-in-out hover:-translate-y-0 hover:scale-110 bg-custom-accent`}
    >
      {children}
    </button>
  );
};

// hover:bg-custom-4/30
// ${
//   disabled ? 'hidden cursor-not-allowed bg-custom-2/0' : ' bg-RED-500'
// }
