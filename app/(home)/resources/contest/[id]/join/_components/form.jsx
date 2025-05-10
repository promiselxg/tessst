"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/contest.form.conext";
import PersonalInfo from "./contest-personal-info";
import ContestUploadFile from "./contest-upload-file";
import ContestReview from "./contest-review";
import ContestTerms from "./contest-terms";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { apiCall } from "@/lib/utils/api";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";

const steps = [
  "Personal Info",
  "Upload File",
  "Review Details",
  "Terms & Conditions",
];

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name is required")
    .max(50, "First name is too long"),
  last_name: z
    .string()
    .min(2, "Last name is required")
    .max(50, "Last name is too long"),

  phone: z
    .string()
    .min(2, "Phone number is required")
    .max(50, "Phone number is too long")
    .regex(/^\+?[0-9]\d{1,14}$/, "Please enter a valid phone number"),

  email: z
    .string()
    .min(2, "Email is required")
    .max(50, "Email is too long")
    .email("Invalid email format"),
});

const MultiStepForm = ({ contestId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { formData, clearFormData } = useFormContext();
  const { user } = useAuth();
  const router = useRouter();

  const validateStep = (step) => {
    switch (step) {
      case 0:
        const result = formSchema.safeParse(formData);

        if (!result.success) {
          const formattedErrors = result.error.format();
          const firstFieldWithError = Object.keys(formattedErrors).find(
            (key) => key !== "_errors" && formattedErrors[key]?._errors?.length
          );

          const errorMessage =
            formattedErrors[firstFieldWithError]?._errors?.[0] ||
            formattedErrors._errors?.[0] ||
            "Form validation failed.";

          toast.error(errorMessage);
          return;
        }
        break;

      case 1: {
        const file = formData.file;

        if (!file || !(file instanceof File)) {
          toast.error("Please select a valid video file.");
          return false;
        }
        const allowedTypes = ["video/mp4", "video/x-mvi", "video/x-matroska"];
        const allowedExtensions = [".mp4", ".mvi", ".mkv"];
        const fileType = file.type;
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.slice(fileName.lastIndexOf("."));

        const hasValidType = allowedTypes.includes(fileType);
        const hasValidExtension = allowedExtensions.includes(fileExtension);

        if (!hasValidType && !hasValidExtension) {
          toast.error("Only .mp4, .mkv or .mvi video files are allowed.");
          return false;
        }

        // 2. File Size Check (Max 100MB)
        const maxSizeInBytes = 100 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
          toast.error("Video must be less than 100MB.");
          return false;
        }

        // 3. Video Metadata Check (duration & resolution)
        const meta = formData.videoMeta;
        if (!meta) {
          toast.error("Video metadata is still loading. Please wait.");
          return false;
        }

        const durationParts = meta.duration.split(":").map(Number);
        const totalSeconds =
          durationParts.length === 3
            ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
            : durationParts[0] * 60 + durationParts[1];

        const [width] = meta.resolution.split(" x ").map(Number);

        if (totalSeconds < 30) {
          toast.error("Video must be at least 30 seconds long.");
          return false;
        }

        if (width < 720) {
          toast.error("Video resolution must be at least 720px wide.");
          return false;
        }

        break;
      }

      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (!validateStep(currentStep)) return;
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <ContestUploadFile />;
      case 2:
        return <ContestReview />;
      case 3:
        return <ContestTerms />;
      default:
        return <PersonalInfo />;
    }
  };

  const handleFormSubmission = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data?.file);
      formData.append("userId", user.id);
      formData.append("contestId", contestId);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      const response = await apiCall("post", "/upload/contest", formData);
      if (response) {
        toast.success(response.message);
        clearFormData();
        router.replace(`/resources/contest/${contestId}`);
      }
    } catch (error) {
      toast.error(error.message);
      router.replace(`/resources/contest`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-between mb-6 relative">
        {steps.map((label, index) => (
          <div
            key={index}
            className="relative flex flex-1 flex-col items-center"
          >
            {/* Circle Step Indicator */}
            <div
              className={`w-8 h-8 z-10 rounded-full flex items-center justify-center border-2 text-sm font-medium ${
                index <= currentStep
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <span className="hidden md:flex text-xs text-center w-max mt-2">
              {label}
            </span>

            {/* Connecting Line */}
            {index !== steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 z-0">
                <div
                  className={`h-full bg-blue-600 transition-all duration-500 ease-in-out ${
                    index < currentStep ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-5 w-full md:w-[1000px] mx-auto p-10 bg-white shadow rounded">
        {renderStepContent()}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button
              onClick={() => handleFormSubmission(formData)}
              disabled={!formData.agree || loading}
            >
              {loading ? (
                <>
                  <Loader2 className=" animate-spin" />
                  please wait...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
