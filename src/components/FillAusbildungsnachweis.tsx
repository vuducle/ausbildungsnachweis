import React, { useState, ChangeEvent, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

interface FormData {
  [key: string]: string;
}

const initialFormData: FormData = {
  Name: "Vu Duc Le",
  DatumStart: "04.07.2022",
  DatumEnde: "10.07.2022",
  Nr: "97",
  Ausbildungsjahr: "2. Lehrjahr",
  Mo_Sec_1: "",
  Mo_1: "",
  Mo_Time_1: "",
  Mo_Sec_2: "",
  Mo_2: "",
  Mo_Time_2: "",
  Mo_Sec_3: "",
  Mo_3: "",
  Mo_Time_3: "",
  Mo_Sec_4: "",
  Mo_4: "",
  Mo_Time_4: "",
  Mo_Sec_5: "",
  Mo_5: "",
  Mo_Time_5: "",
  Mo_Total: "",
  Tu_Sec_1: "",
  Tu_1: "",
  Tu_Time_1: "",
  Tu_Sec_2: "",
  Tu_2: "",
  Tu_Time_2: "",
  Tu_Sec_3: "",
  Tu_3: "",
  Tu_Time_3: "",
  Tu_Sec_4: "",
  Tu_4: "",
  Tu_Time_4: "",
  Tu_Sec_5: "",
  Tu_5: "",
  Tu_Time_5: "",
  Tu_Total: "",
  We_Sec_1: "",
  We_1: "",
  We_Time_1: "",
  We_Sec_2: "",
  We_2: "",
  We_Time_2: "",
  We_3: "",
  We_Time_3: "",
  We_Sec_3: "",
  We_4: "",
  We_Time_4: "",
  We_Sec_4: "",
  We_Sec_5: "",
  We_5: "",
  We_Time_5: "",
  We_Total: "",
  Th_Sec_1: "",
  Th_1: "",
  Th_Time_1: "",
  Th_Sec_2: "",
  Th_2: "",
  Th_Time_2: "",
  Th_3: "",
  Th_Time_3: "",
  Th_Sec_3: "",
  Th_4: "",
  Th_Time_4: "",
  Th_Sec_4: "",
  Th_Sec_5: "",
  Th_5: "",
  Th_Time_5: "",
  Th_Total: "",
  Fr_1: "",
  Fr_Sec_1: "",
  Fr_Time_1: "",
  Fr_2: "",
  Fr_Sec_2: "",
  Fr_Time_2: "",
  Fr_3: "",
  Fr_Sec_3: "",
  Fr_Time_3: "",
  Fr_4: "",
  Fr_Time_4: "",
  Fr_Sec_4: "",
  Fr_5: "",
  Fr_Sec_5: "",
  Fr_Time_5: "",
  Sa_Sec_1: "",
  Sa_1: "",
  Sa_Time_1: "",
  Sa_2: "",
  Sa_Sec_2: "",
  Sa_Time_2: "",
  Sa_3: "",
  Sa_Time_3: "",
  Sa_Sec_3: "",
  Su_1: "",
  Su_Sec_1: "",
  Su_Time_1: "",
  Su_2: "",
  Su_Sec_2: "",
  Su_Time_2: "",
  Su_Sec_3: "",
  Su_3: "",
  Su_Time_3: "",
  Gesamtstunden: "",
  Remark: "",
  Ausbilder: "",
  Date_Azubi: "",
  Sig_Azubi: "",
  Sig_Ausbilder: "",
};

const FillAusbildungsnachweis: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fillForm = async () => {
    const formURL = `${process.env.PUBLIC_URL}/assets/test.pdf`;

    const formBytes = await fetch(formURL).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formBytes);

    const form = pdfDoc.getForm();

    Object.entries(formData).forEach(([key, value]) => {
      form.getTextField(key).setText(value);
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    setPreviewPdfUrl(URL.createObjectURL(blob));
  };

  useEffect(() => {
    fillForm();
  }, [formData]);

  const renderInputFields = () => {
    return Object.keys(initialFormData).map((key) => (
      <input
        key={key}
        type="text"
        name={key}
        value={formData[key]}
        onChange={handleChange}
        placeholder={key}
      />
    ));
  };

  return (
    <div>
      <form>{renderInputFields()}</form>
      <button onClick={fillForm}>Generate PDF</button>
      {previewPdfUrl && (
        <iframe
          src={previewPdfUrl}
          title="PDF Preview"
          width="100%"
          height="600px"
        />
      )}
    </div>
  );
};

export default FillAusbildungsnachweis;
