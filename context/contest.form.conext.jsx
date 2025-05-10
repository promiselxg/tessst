"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext();

const defaultData = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  file: null,
  agree: false,
  videoMeta: null,
};

export const ContestFormProvider = ({ children }) => {
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("contestFormData");
      return saved ? JSON.parse(saved) : defaultData;
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem("contestFormData", JSON.stringify(formData));
  }, [formData]);

  const updateForm = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const setVideoMeta = (meta) => {
    updateForm({ videoMeta: meta });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    updateForm({
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });

    if (type === "file" && files?.[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const clearFormData = () => {
    setFormData({});
    if (typeof window !== "undefined") {
      localStorage.removeItem("contestFormData");
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateForm,
        handleChange,
        videoPreviewUrl,
        setVideoMeta,
        clearFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
