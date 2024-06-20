import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import GeneralInfo from "./GeneralInfo";
import DaySection from "./DaySection";
import Info from "./Info";

interface FormData {
  [key: string]: {
    value: string | number;
    required: boolean;
    placeholder: string;
    type: string;
  };
}

const initialFormData: FormData = {
  Name: {
    value: "Vu Duc Le",
    required: true,
    placeholder: "Name *",
    type: "text",
  },
  DatumStart: {
    value: "04.07.2022",
    required: true,
    placeholder: "DatumStart *",
    type: "date",
  },
  DatumEnde: {
    value: "10.07.2022",
    required: true,
    placeholder: "DatumEnde *",
    type: "date",
  },
  Nr: {
    value: 97,
    required: true,
    placeholder: "Nummer *",
    type: "number",
  },
  Ausbildungsjahr: {
    value: "2. Lehrjahr",
    required: true,
    placeholder: "Lehrjahr Azubi *",
    type: "text",
  },
  // Montag
  Mo_1: {
    value: "Webseite gecodet mit M. O.",
    required: false,
    placeholder: "Montag, Beschreibung, Tätigkeit #1",
    type: "text",
  },
  Mo_2: {
    value: "Teambesprechung mit S. R.",
    required: false,
    placeholder: "Montag, Beschreibung, Tätigkeit #2",
    type: "text",
  },
  Mo_3: {
    value: "Unterstützung von den TD'S",
    required: false,
    placeholder: "Montag, Beschreibung, Tätigkeit #3",
    type: "text",
  },
  Mo_4: {
    value: "",
    required: false,
    placeholder: "Montag, Beschreibung, Tätigkeit #4",
    type: "text",
  },
  Mo_5: {
    value: "",
    required: false,
    placeholder: "Montag, Beschreibung, Tätigkeit #5",
    type: "text",
  },
  Mo_Time_1: {
    value: 2,
    required: false,
    placeholder: "Montag, Zeit von Beschreibung #1",
    type: "number",
  },
  Mo_Time_2: {
    value: 2,
    required: false,
    placeholder: "Montag, Zeit von Beschreibung #2",
    type: "number",
  },
  Mo_Time_3: {
    value: 2,
    required: false,
    placeholder: "Montag, Zeit von Beschreibung #3",
    type: "number",
  },
  Mo_Time_4: {
    value: "",
    required: false,
    placeholder: "Montag, Zeit von Beschreibung #4",
    type: "number",
  },
  Mo_Time_5: {
    value: "",
    required: false,
    placeholder: "Montag, Zeit von Beschreibung #5",
    type: "number",
  },
  Mo_Total: {
    value: 6,
    required: false,
    placeholder: "Montag, Gesamtzeit",
    type: "number",
  },
  Mo_Sec_1: {
    value: "",
    required: false,
    placeholder: "Montag, Abteilung #1",
    type: "text",
  },
  Mo_Sec_2: {
    value: "",
    required: false,
    placeholder: "Montag, Abteilung #2",
    type: "text",
  },
  Mo_Sec_3: {
    value: "",
    required: false,
    placeholder: "Montag, Abteilung #3",
    type: "text",
  },
  Mo_Sec_4: {
    value: "",
    required: false,
    placeholder: "Montag, Abteilung #4",
    type: "text",
  },
  Mo_Sec_5: {
    value: "",
    required: false,
    placeholder: "Montag, Abteilung #5",
    type: "text",
  },
  Tu_1: {
    value: "Webseite gecodet mit F. O.",
    required: false,
    placeholder: "Dienstag, Beschreibung, Tätigkeit #1",
    type: "text",
  },
  Tu_2: {
    value: "Besprechung mit F. R.",
    required: false,
    placeholder: "Dienstag, Beschreibung, Tätigkeit #2",
    type: "text",
  },
  Tu_3: {
    value: "Layout designet mit C. W.",
    required: false,
    placeholder: "Dienstag, Beschreibung, Tätigkeit #3",
    type: "text",
  },
  Tu_4: {
    value: "",
    required: false,
    placeholder: "Dienstag, Beschreibung, Tätigkeit #4",
    type: "text",
  },
  Tu_5: {
    value: "",
    required: false,
    placeholder: "Dienstag, Beschreibung, Tätigkeit #5",
    type: "text",
  },
  Tu_Time_1: {
    value: 2,
    required: false,
    placeholder: "Dienstag, Zeit von Beschreibung #1",
    type: "number",
  },
  Tu_Time_2: {
    value: 2,
    required: false,
    placeholder: "Dienstag, Zeit von Beschreibung #2",
    type: "number",
  },
  Tu_Time_3: {
    value: 2,
    required: false,
    placeholder: "Dienstag, Zeit von Beschreibung #3",
    type: "number",
  },
  Tu_Time_4: {
    value: "",
    required: false,
    placeholder: "Dienstag, Zeit von Beschreibung #4",
    type: "number",
  },
  Tu_Time_5: {
    value: "",
    required: false,
    placeholder: "Dienstag, Zeit von Beschreibung #5",
    type: "number",
  },
  Tu_Total: {
    value: 6,
    required: false,
    placeholder: "Dienstag, Gesamtzeit",
    type: "number",
  },
  Tu_Sec_1: {
    value: "",
    required: false,
    placeholder: "Dienstag, Abteilung #1",
    type: "text",
  },
  Tu_Sec_2: {
    value: "",
    required: false,
    placeholder: "Dienstag, Abteilung #2",
    type: "text",
  },
  Tu_Sec_3: {
    value: "",
    required: false,
    placeholder: "Dienstag, Abteilung #3",
    type: "text",
  },
  Tu_Sec_4: {
    value: "",
    required: false,
    placeholder: "Dienstag, Abteilung #4",
    type: "text",
  },
  Tu_Sec_5: {
    value: "",
    required: false,
    placeholder: "Dienstag, Abteilung #5",
    type: "text",
  },
  // Mittwoch
  We_1: {
    value: "Webseite gecodet alleine",
    required: false,
    placeholder: "Mittwoch, Beschreibung, Tätigkeit #1",
    type: "text",
  },
  We_2: {
    value: "Layout gemacht alleine",
    required: false,
    placeholder: "Mittwoch, Beschreibung, Tätigkeit #2",
    type: "text",
  },
  We_3: {
    value: "Kundengespräch mit Fr. Myoi",
    required: false,
    placeholder: "Mittwoch, Beschreibung, Tätigkeit #3",
    type: "text",
  },
  We_4: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Beschreibung, Tätigkeit #4",
    type: "text",
  },
  We_5: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Beschreibung, Tätigkeit #5",
    type: "text",
  },
  We_Time_1: {
    value: 2,
    required: false,
    placeholder: "Mittwoch, Zeit von Beschreibung #1",
    type: "number",
  },
  We_Time_2: {
    value: 2,
    required: false,
    placeholder: "Mittwoch, Zeit von Beschreibung #2",
    type: "number",
  },
  We_Time_3: {
    value: 2,
    required: false,
    placeholder: "Mittwoch, Zeit von Beschreibung #3",
    type: "number",
  },
  We_Time_4: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Zeit von Beschreibung #4",
    type: "number",
  },
  We_Time_5: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Zeit von Beschreibung #5",
    type: "number",
  },
  We_Total: {
    value: 6,
    required: false,
    placeholder: "Mittwoch, Gesamtzeit",
    type: "number",
  },
  We_Sec_1: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Abteilung #1",
    type: "text",
  },
  We_Sec_2: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Abteilung #2",
    type: "text",
  },
  We_Sec_3: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Abteilung #3",
    type: "text",
  },
  We_Sec_4: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Abteilung #4",
    type: "text",
  },
  We_Sec_5: {
    value: "",
    required: false,
    placeholder: "Mittwoch, Abteilung #5",
    type: "text",
  },
  // Donnerstag
  Th_1: {
    value: "Unterricht - Datenbanken mit Fr. Hirai",
    required: false,
    placeholder: "Donnerstag, Beschreibung, Tätigkeit #1",
    type: "text",
  },
  Th_2: {
    value: "Projektarbeit - InDesign mit Hr. Dorri",
    required: false,
    placeholder: "Donnerstag, Beschreibung, Tätigkeit #2",
    type: "text",
  },
  Th_3: {
    value: "Unterricht - Medienwirtschaft mit Hr. Yildirim",
    required: false,
    placeholder: "Donnerstag, Beschreibung, Tätigkeit #3",
    type: "text",
  },
  Th_4: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Beschreibung, Tätigkeit #4",
    type: "text",
  },
  Th_5: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Beschreibung, Tätigkeit #5",
    type: "text",
  },
  Th_Time_1: {
    value: 2,
    required: false,
    placeholder: "Donnerstag, Zeit von Beschreibung #1",
    type: "number",
  },
  Th_Time_2: {
    value: 2,
    required: false,
    placeholder: "Donnerstag, Zeit von Beschreibung #2",
    type: "number",
  },
  Th_Time_3: {
    value: 2,
    required: false,
    placeholder: "Donnerstag, Zeit von Beschreibung #3",
    type: "number",
  },
  Th_Time_4: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Zeit von Beschreibung #4",
    type: "number",
  },
  Th_Time_5: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Zeit von Beschreibung #5",
    type: "number",
  },
  Th_Total: {
    value: 6,
    required: false,
    placeholder: "Donnerstag, Gesamtzeit",
    type: "number",
  },
  Th_Sec_1: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Abteilung #1",
    type: "text",
  },
  Th_Sec_2: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Abteilung #2",
    type: "text",
  },
  Th_Sec_3: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Abteilung #3",
    type: "text",
  },
  Th_Sec_4: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Abteilung #4",
    type: "text",
  },
  Th_Sec_5: {
    value: "",
    required: false,
    placeholder: "Donnerstag, Abteilung #5",
    type: "text",
  },
  // Freitag
  Fr_1: {
    value: "Unterricht - Datenbanken mit Fr. Hirai",
    required: false,
    placeholder: "Freitag, Beschreibung, Tätigkeit #1",
    type: "text",
  },
  Fr_2: {
    value: "Projektarbeit - Logogestaltung - Einzelarbeit",
    required: false,
    placeholder: "Freitag, Beschreibung, Tätigkeit #2",
    type: "text",
  },
  Fr_3: {
    value: "Unterricht - Medienwirtschaft mit Hr. Yildirim",
    required: false,
    placeholder: "Freitag, Beschreibung, Tätigkeit #3",
    type: "text",
  },
  Fr_4: {
    value: "",
    required: false,
    placeholder: "Freitag, Beschreibung, Tätigkeit #4",
    type: "text",
  },
  Fr_5: {
    value: "",
    required: false,
    placeholder: "Freitag, Beschreibung, Tätigkeit #5",
    type: "text",
  },
  Fr_Total: {
    value: 6,
    required: false,
    placeholder: "Freitag, Gesamtzeit",
    type: "number",
  },
  Fr_Time_1: {
    value: 2,
    required: false,
    placeholder: "Freitag, Zeit von Beschreibung #1",
    type: "number",
  },
  Fr_Time_2: {
    value: 2,
    required: false,
    placeholder: "Freitag, Zeit von Beschreibung #2",
    type: "number",
  },
  Fr_Time_3: {
    value: 2,
    required: false,
    placeholder: "Freitag, Zeit von Beschreibung #3",
    type: "number",
  },
  Fr_Time_4: {
    value: "",
    required: false,
    placeholder: "Freitag, Zeit von Beschreibung #4",
    type: "number",
  },
  Fr_Time_5: {
    value: "",
    required: false,
    placeholder: "Freitag, Zeit von Beschreibung #5",
    type: "number",
  },
  Fr_Sec_1: {
    value: "",
    required: false,
    placeholder: "Freitag, Abteilung #1",
    type: "text",
  },
  Fr_Sec_2: {
    value: "",
    required: false,
    placeholder: "Freitag, Abteilung #2",
    type: "text",
  },
  Fr_Sec_3: {
    value: "",
    required: false,
    placeholder: "Freitag, Abteilung #3",
    type: "text",
  },
  Fr_Sec_4: {
    value: "",
    required: false,
    placeholder: "Freitag, Abteilung #4",
    type: "text",
  },
  Fr_Sec_5: {
    value: "",
    required: false,
    placeholder: "Freitag, Abteilung #5",
    type: "text",
  },
  Sa_1: {
    value: "",
    required: false,
    placeholder: "Samstag, Beschreibung, Tätigkeit #1",
    type: "text",
  },
  Sa_2: {
    value: "",
    required: false,
    placeholder: "Samstag, Beschreibung, Tätigkeit #2",
    type: "text",
  },
  Sa_3: {
    value: "",
    required: false,
    placeholder: "Samstag, Beschreibung, Tätigkeit #3",
    type: "text",
  },
  Sa_Time_1: {
    value: "",
    required: false,
    placeholder: "Samstag, Zeit von Beschreibung #1",
    type: "number",
  },
  Sa_Time_2: {
    value: "",
    required: false,
    placeholder: "Samstag, Zeit von Beschreibung #2",
    type: "number",
  },
  Sa_Time_3: {
    value: "",
    required: false,
    placeholder: "Samstag, Zeit von Beschreibung #3",
    type: "number",
  },
  Sa_Sec_1: {
    value: "",
    required: false,
    placeholder: "Samstag, Abteilung #1",
    type: "text",
  },
  Sa_Sec_2: {
    value: "",
    required: false,
    placeholder: "Samstag, Abteilung #2",
    type: "text",
  },
  Sa_Sec_3: {
    value: "",
    required: false,
    placeholder: "Samstag, Abteilung #3",
    type: "text",
  },
  Su_1: {
    value: "",
    required: false,
    placeholder: "Sonntag, Beschreibung, Tätigkeit #1",
    type: "text",
  },
  Su_2: {
    value: "",
    required: false,
    placeholder: "Sonntag, Beschreibung, Tätigkeit #2",
    type: "text",
  },
  Su_3: {
    value: "",
    required: false,
    placeholder: "Sonntag, Beschreibung, Tätigkeit #3",
    type: "text",
  },
  Su_Time_1: {
    value: "",
    required: false,
    placeholder: "Sonntag, Zeit von Beschreibung #1",
    type: "number",
  },
  Su_Time_2: {
    value: "",
    required: false,
    placeholder: "Sonntag, Zeit von Beschreibung #2",
    type: "number",
  },
  Su_Time_3: {
    value: "",
    required: false,
    placeholder: "Sonntag, Zeit von Beschreibung #3",
    type: "number",
  },
  Su_Sec_1: {
    value: "",
    required: false,
    placeholder: "Sonntag, Abteilung #1",
    type: "text",
  },
  Su_Sec_2: {
    value: "",
    required: false,
    placeholder: "Sonntag, Abteilung #1",
    type: "text",
  },
  Su_Sec_3: {
    value: "",
    required: false,
    placeholder: "Sonntag, Abteilung #1",
    type: "text",
  },
  Gesamtstunden: {
    value: 32,
    required: false,
    placeholder: "Gesamtstunden",
    type: "number",
  },
  Remark: {
    value: "",
    required: false,
    placeholder: "Bemerkung",
    type: "text",
  },
  Ausbilder: {
    value: "",
    required: false,
    placeholder: "Ausbilder/in",
    type: "text",
  },
  Date_Azubi: {
    value: "",
    required: false,
    placeholder: "Datum - Azubi",
    type: "date",
  },
  Sig_Azubi: {
    value: "",
    required: false,
    placeholder: "Signatur - Azubi",
    type: "text",
  },
  Sig_Ausbilder: {
    value: "",
    required: false,
    placeholder: "Signatur - Ausbilder/in",
    type: "text",
  },
};

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
