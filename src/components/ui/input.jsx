import React from 'react';

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${props.className || ''}`}
    />
  );
}
