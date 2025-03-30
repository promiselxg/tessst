import { Loader2, LucideFileUp } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const VideoFileUpload = ({ chapterId, courseId, onSuccessfulSubmit }) => {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (!e?.target?.files) return;
    const file = e.target.files[0];

    e.target.value = "";

    setFiles([]);
    const allowedExtensions = ["mp4", "webm", "ogv", "mp3"];

    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Only .mp4, .webm, .ogv and .mp3 files are allowed.");
      return;
    }

    setFiles(file);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("chapterId", chapterId);
    formData.append("courseId", courseId);

    try {
      const response = await fetch("/api/upload/video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        toast.error("An error occurred while uploading the video.");

      await response.json();
      if (response.ok) {
        toast.success("video uploaded successfully.");
        onSuccessfulSubmit();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full space-y-4">
        <div className=" space-y-4 h-[150px] md:h-[300px] flex items-center flex-col justify-center">
          <label
            htmlFor="files"
            className="flex flex-col items-center cursor-pointer"
          >
            <LucideFileUp size={40} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Upload a video</p>
            <p className="text-xs text-muted-foreground italic">
              Select a video for thhis chapter.
            </p>
          </label>
          <Input
            type="file"
            name="files"
            id="files"
            accept=".mp4,.webm, .ogv, .mp3"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex items-center justify-center mb-2">
            <Button
              onClick={() => handleFileUpload(files)}
              disabled={loading || !files}
              className={`w-fit cursor-pointer flex items-center ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className=" animate-spin" />
                  <span className="text-sm italic">Uploading...</span>
                </div>
              ) : (
                <>{!files ? "No video file selected" : "Upload video"}</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoFileUpload;
