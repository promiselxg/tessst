"use client";
import React, { useEffect, useState } from "react";
import { useImageContext } from "@/context/imageUpload.context";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

import DocumentFileUpload from "@/components/document/file-upload";
import { handleDeleteBtn } from "@/lib/utils/deleteItemFromDb";
import { useRouter } from "next/navigation";

const AttachmentForm = ({ initialData, courseId, onSuccessfulSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { uploadStatus, setUploadStatus, setSelectedImages } =
    useImageContext();

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setUploadStatus("pending");
    setSelectedImages([]);
  };

  const handleDelete = (attachmentId) => {
    handleDeleteBtn(
      `/training/course/${courseId}/attachment/${attachmentId}`,
      "",
      `/dashboard/training/course/${courseId}`,
      router
    );
  };

  useEffect(() => {
    if (uploadStatus === "completed") {
      setIsEditing(false);
    }
  }, [uploadStatus]);

  return (
    <>
      <div className="mt-6 border bg-slate-100 rounded-md p-4 transition-all">
        <div className="font-medium flex items-center justify-between">
          course attachments
          <Button
            variant="ghost"
            onClick={() => toggleEdit()}
            className=" cursor-pointer flex items-center"
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mt-1 h-4 w-4 cursor-pointer" />
                add a file
              </>
            )}
          </Button>
        </div>

        {isEditing && (
          <DocumentFileUpload
            courseId={courseId}
            onSuccessfulSubmit={onSuccessfulSubmit}
          />
        )}
        {!isEditing && initialData?.attachments?.length === 0 && (
          <p className="text-sm mt-2 text-slate-500 italic">
            No attachments yet
          </p>
        )}
        {!isEditing && initialData?.attachments?.length > 0 && (
          <div className="mt-4">
            {initialData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-x-2 w-full justify-between"
              >
                <a
                  href={attachment.asset.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  {attachment.name}
                </a>
                <Button
                  variant="ghost"
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(attachment.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AttachmentForm;
