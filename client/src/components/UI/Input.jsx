import React from 'react';

export const Input = ({
  placeholder,
  // value,
  // onChange,
  handleKeyDown,
  className,
}) => {
  return (
    <textarea
      type="text"
      placeholder={placeholder}
      // onChange={onChange}
      onKeyDown={handleKeyDown}
      // value={value}
      className={`w-full h-full p-2 resize-none rounded-lg bg-custom-4/0 outline-none ${className}`}
    />
  );
};
