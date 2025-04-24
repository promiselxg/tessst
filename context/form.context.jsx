"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        delete parsedData.product_main_image;
        delete parsedData.product_images;
        return parsedData;
      }
    }
    return {};
  });

  const [formErrors, setErrors] = useState(() => {
    // Remove errors from localStorage on page refresh
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("formErrors", JSON.stringify(formErrors));
    }
  }, [formData, formErrors]);

  const validateField = (fieldName, value) => {
    const newErrors = [...formErrors];
    const existingErrorIndex = newErrors.findIndex(
      (error) => error.path === fieldName
    );
    if (existingErrorIndex > -1) {
      newErrors.splice(existingErrorIndex, 1);
    }

    if (!value) {
      newErrors?.push({ message: "This field is required", path: fieldName });
    }

    setErrors(newErrors);
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      Object.keys(newData).forEach((key) => {
        validateField(key, updatedData[key]);
      });
      return updatedData;
    });
  };

  const updateFormErrors = (newErrors) => {
    setErrors(newErrors);
  };

  const clearFormData = () => {
    setFormData({});
    setErrors([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("formData");
      localStorage.removeItem("formErrors");
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        formErrors,
        updateFormData,
        updateFormErrors,
        clearFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
