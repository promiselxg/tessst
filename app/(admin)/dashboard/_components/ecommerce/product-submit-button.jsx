"use client";

import { Button } from "@/components/ui/button";
import { useFormData } from "@/context/form.context";
import {
  extractValidationErrors,
  productSchema,
} from "@/lib/schema/productSchema";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const ProductSubmitButton = () => {
  const { formData, updateFormErrors } = useFormData();
  const [loading, setLoading] = useState(false);

  const handleProducSubmit = async () => {
    try {
      setLoading(true);
      const validatedProduct = productSchema.parse(formData);
      console.log("Validated data", validatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorsArray = extractValidationErrors(error.errors);
        updateFormErrors(errorsArray);
        toast.error("Validation errors: please fix the error and try again");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleProducSubmit()}
        className="bg-sky-700 hover:bg-sky-600 text-white w-[150px] h-10"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2 className=" animate-spin" />
            please wait...
          </div>
        ) : (
          "Submit product"
        )}
      </Button>
    </>
  );
};

export default ProductSubmitButton;
