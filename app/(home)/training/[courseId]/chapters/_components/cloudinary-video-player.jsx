"use client";

import { useCallback, useEffect, useRef } from "react";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";
import { useRouter } from "next/navigation";
import useConfettiStore from "@/store/confettiStore";
import { toast } from "sonner";
import { apiCall } from "@/lib/utils/api";

const VideoPlayer = ({
  id,
  publicId,
  nextChapterId,
  courseId,
  chapterId,
  purchaseId,
  completeOnEnd,
  playerConfig,
  sourceConfig,
  ...props
}) => {
  const cloudinaryRef = useRef();
  const playerRef = useRef();
  const router = useRouter();
  const confetti = useConfettiStore();

  const handleUpdateChapterProgress = useCallback(async () => {
    try {
      if (completeOnEnd) {
        await apiCall(
          "put",
          `/training/course/${courseId}/chapter/${chapterId}/progress`,
          { isCompleted: true }
        );

        if (!nextChapterId) {
          confetti.showConfetti();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/training/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }, [completeOnEnd, courseId, chapterId, nextChapterId, router, confetti]);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = cloudinary;

    const player = cloudinaryRef.current.videoPlayer(playerRef.current, {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "promiselxg",
      secure: true,
      controls: true,
      ...playerConfig,
    });

    player?.source(publicId, sourceConfig);

    player?.on("ready", () => {
      player.play();
    });

    player.on("ended", () => {
      handleUpdateChapterProgress();
      // if (nextChapterId) {
      //   router.push(nextChapterUrl);
      // }
    });
    player.on("error", (error) => {
      console.error("Error occurred:", error);
    });
  }, [playerConfig, publicId, sourceConfig, handleUpdateChapterProgress]);

  return (
    <video
      ref={playerRef}
      id={id}
      className="cld-video-player cld-fluid"
      {...props}
    />
  );
};

export default VideoPlayer;
