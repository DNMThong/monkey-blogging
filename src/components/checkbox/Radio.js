import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: null,
  });

  const value = /\D/.test(field.value)?field.value:Number(field.value);


  return (
    <label>
      <input
        checked={value === rest.value}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${
            value === rest.value ? "bg-green-400 text-white" : "bg-gray-200 text-transparent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;