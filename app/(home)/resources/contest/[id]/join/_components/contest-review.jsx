"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "@/context/contest.form.conext";

const ContestReview = () => {
  const { formData } = useFormContext();

  return (
    <Card className="w-full mx-auto ">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Submission Review
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-gray-900">Name:</span>{" "}
          {formData?.first_name} {formData?.last_name}
        </div>
        <div>
          <span className="font-medium text-gray-900">Email:</span>{" "}
          {formData?.email}
        </div>
        <div>
          <span className="font-medium text-gray-900">File:</span>{" "}
          {formData?.file?.name || "No file uploaded"}
        </div>

        {(formData?.videoMeta?.duration || formData?.videoMeta?.resolution) && (
          <div className="pt-2 border-t border-gray-200 space-y-1">
            <div>
              <span className="font-medium text-gray-900">Duration:</span>{" "}
              {formData?.videoMeta?.duration || "N/A"}
            </div>
            <div>
              <span className="font-medium text-gray-900">Resolution:</span>{" "}
              {formData?.videoMeta?.resolution || "N/A"}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContestReview;
