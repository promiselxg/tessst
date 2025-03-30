"use client";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({ url }) => {
  return (
    <>
      <div className="flex w-full my-3">
        <ReactPlayer url={url} controls className="w-full" width={1100} />
      </div>
    </>
  );
};

export default VideoPlayer;
