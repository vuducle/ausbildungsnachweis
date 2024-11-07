import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import GeneralInfo from "./GeneralInfo";
import DaySection from "./DaySection";
import Info from "./Info";
import initialFormData from "./initialFormData";

interface FormData {
  [key: string]: {
    value: string | number;
    required: boolean;
    placeholder: string;
    type: string;
  };
}

const FillAusbildungsnachweis: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : initialFormData;
  });
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue =
      formData[name].type === "number" ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: { ...formData[name], value: updatedValue },
    });
  };

  const generatePdf = useCallback(
    async (download: boolean = false) => {
      const formURL = `${process.env.PUBLIC_URL}/assets/test.pdf#toolbar=0&navpanes=0`;

      const formBytes = await fetch(formURL).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(formBytes);

      const form = pdfDoc.getForm();

      Object.entries(formData).forEach(([key, { value }]) => {
        form.getTextField(key).setText(value.toString());
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      if (download === true) {
        saveAs(blob, "Ausbildungsnachweis.pdf");
      } else {
        setPreviewPdfUrl(URL.createObjectURL(blob));
      }

      localStorage.setItem("formData", JSON.stringify(formData));
    },
    [formData]
  );

  const fillForm = useCallback(() => {
    generatePdf();
  }, [generatePdf]);

  useEffect(() => {
    fillForm();
  }, [fillForm]);

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <div className="flex container mx-auto bg-white p-4 bg-opacity-75 rounded-md">
      <div className="w-full overflow-y-scroll xl:w-7/12 xl:h-700">
        {/* <form>{renderInputFields()}</form>
        <button onClick={fillForm}>Generate PDF</button> */}
        <Info />
        <GeneralInfo formData={formData} handleChange={handleChange} />
        {days.map((day) => (
          <DaySection
            key={day}
            day={day}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
        <button
          className="bg-rose-500 hover:bg-rose-700 transition-all text-white font-bold py-2 px-4 rounded-full"
          onClick={() => generatePdf(true)}
        >
          Generate PDF
        </button>
      </div>
      <div className="flex-1 w-full xl:w-5/12">
        {previewPdfUrl && (
          <iframe
            src={previewPdfUrl}
            title="PDF Preview"
            width="100%"
            className="xl:h-700"
          />
        )}
      </div>
    </div>
  );
};

export default FillAusbildungsnachweis;
