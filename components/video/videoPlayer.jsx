"use client";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({ url, className, height = "100%" }) => {
  return (
    <div className={`flex w-full my-3 ${className}`}>
      <ReactPlayer
        url={url}
        controls
        className={`flex w-full my-3 ${className}`}
        width="100%"
        height={height}
      />
    </div>
  );
};

export default VideoPlayer;
