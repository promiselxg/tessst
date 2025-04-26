"use client";

import { useEffect, useRef } from "react";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";

const VideoPlayer = ({
  id,
  publicId,
  playerConfig,
  sourceConfig,
  ...props
}) => {
  const cloudinaryRef = useRef();
  const playerRef = useRef();

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
      //   if (nextChapterUrl) {
      //     router.push(nextChapterUrl);
      //   }
    });
    player.on("error", (error) => {
      console.error("Error occurred:", error);
    });
  }, [playerConfig, publicId, sourceConfig]);

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
