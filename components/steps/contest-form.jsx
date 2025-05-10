"use client";
import { useState } from "react";

const steps = [
  "Personal Info",
  "Upload File",
  "Review Details",
  "Terms & Conditions",
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <div>Step 1: Personal Info Form</div>;
      case 1:
        return <div>Step 2: Upload File Section</div>;
      case 2:
        return <div>Step 3: Review Details</div>;
      case 3:
        return <div>Step 4: Terms & Conditions</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between mb-6">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`flex items-center text-sm gap-2 mr-4 ${
              index === currentStep
                ? "text-blue-600 font-bold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                index === currentStep
                  ? "bg-blue-100 border-blue-600"
                  : "border-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-1">{label}</span>
          </div>
        ))}
      </div>

      <div className="border p-4 rounded bg-white shadow-sm mb-4">
        {renderStepContent()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
