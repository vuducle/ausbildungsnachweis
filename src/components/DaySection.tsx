import React, { ChangeEvent } from "react";

interface DaySectionProps {
  day: string;
  formData: {
    [key: string]: {
      value: string | number;
      required: boolean;
      placeholder: string;
      type: string;
    };
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DaySection: React.FC<DaySectionProps> = ({
  day,
  formData,
  handleChange,
}) => {
  const dayFields = Object.keys(formData).filter((key) => key.startsWith(day));

  return (
    <div className="flex flex-wrap">
      <h3 className="w-full text-3xl mb-4">{day}</h3>
      {dayFields.map((key) => (
        <div key={key} className="w-full md:w-1/2 xl:w-2/6 p-2">
          <label className="flex text-xs">{formData[key].placeholder}</label>
          <input
            className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type={formData[key].type}
            name={key}
            value={formData[key].value}
            onChange={handleChange}
            required={formData[key].required}
          />
        </div>
      ))}
    </div>
  );
};

export default DaySection;
