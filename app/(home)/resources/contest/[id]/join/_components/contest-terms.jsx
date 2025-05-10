"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFormContext } from "@/context/contest.form.conext";
import React from "react";

const ContestTerms = () => {
  const { formData, updateForm } = useFormContext();
  return (
    <>
      <div className="flex items-start space-x-3 p-4 border rounded-md bg-muted/20">
        <Checkbox
          id="agree"
          name="agree"
          checked={formData.agree}
          onCheckedChange={(checked) => updateForm({ agree: checked })}
          className="mt-1"
        />
        <Label
          htmlFor="agree"
          className="text-sm text-muted-foreground leading-relaxed"
        >
          By registering for this hackathon, you authorize{" "}
          <span className="font-medium text-primary">Hashnode</span> to email
          you event details and share your information with{" "}
          <span className="font-medium text-primary">Appwrite</span>.
        </Label>
      </div>
    </>
  );
};

export default ContestTerms;
