import React, { ChangeEvent } from "react";

interface GeneralInfoProps {
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

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  formData,
  handleChange,
}) => {
  const fields = [
    "Name",
    "DatumStart",
    "DatumEnde",
    "Nr",
    "Ausbildungsjahr",
    "Remark",
    "Ausbilder",
    "Date_Azubi",
    "Sig_Azubi",
    "Sig_Ausbilder",
  ];

  return (
    <div className="flex flex-wrap">
      <h3 className="w-full text-3xl mb-4">Allgemeine Informationen</h3>
      {fields.map((key) => (
        <div key={key} className="w-full md:w-1/2 xl:w-2/6 p-2">
          <label className="flex text-xs">{formData[key].placeholder}</label>
          <input
            type={formData[key].type}
            name={key}
            className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={formData[key].value}
            onChange={handleChange}
            required={formData[key].required}
          />
        </div>
      ))}
    </div>
  );
};

export default GeneralInfo;
