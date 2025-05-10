"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "@/context/contest.form.conext";
import React, { useEffect, useRef, useState } from "react";

const ContestUploadFile = () => {
  const { formData, handleChange, videoPreviewUrl, setVideoMeta } =
    useFormContext();
  const [metadata, setMetadata] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && videoPreviewUrl) {
      const handleMetadata = () => {
        const duration = formatDuration(video?.duration);
        const resolution = `${video.videoWidth} x ${video?.videoHeight}`;
        if (
          metadata?.duration !== duration ||
          metadata?.resolution !== resolution
        ) {
          setMetadata({ duration, resolution });
          setVideoMeta({ duration, resolution });
        }
      };

      video.addEventListener("loadedmetadata", handleMetadata);

      if (video.readyState >= 1) {
        handleMetadata();
      }

      return () => {
        video.removeEventListener("loadedmetadata", handleMetadata);
      };
    }
  }, [videoPreviewUrl, metadata, setVideoMeta]);

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return (
    <>
      <Label htmlFor="file">Upload Video File</Label>
      <Input
        id="file"
        name="file"
        type="file"
        accept=".mp4,.mvi,.mkv,video/mp4,video/x-mvi"
        onChange={handleChange}
      />

      {formData.file && (
        <p className="text-sm text-muted-foreground mt-2">
          {formData.file.name}
        </p>
      )}

      {videoPreviewUrl && (
        <div className="mt-4">
          <video
            ref={videoRef}
            src={videoPreviewUrl}
            controls
            className="w-full max-w-md rounded shadow"
          />
          {metadata && (
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>
                <strong>Duration:</strong> {metadata.duration}
              </p>
              <p>
                <strong>Resolution:</strong> {metadata.resolution}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ContestUploadFile;
