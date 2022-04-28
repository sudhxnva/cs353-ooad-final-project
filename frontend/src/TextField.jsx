import React from "react";

export default function TextField({ ...otherProps }) {
  return (
    <input
      className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border border-gray-300 rounded-md"
      {...otherProps}
    />
  );
}
