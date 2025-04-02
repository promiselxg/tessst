"use client";
// components/LottieAnimation.js
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({
  animationData,
  width = "100%",
  height = "100%",
  loop = true,
  autoplay = true,
  style = {},
}) => {
  const container = useRef(null);
  const animation = useRef(null);

  useEffect(() => {
    if (container.current) {
      animation.current = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop,
        autoplay,
        animationData,
      });

      return () => {
        animation.current?.destroy();
      };
    }
  }, [animationData, loop, autoplay]);

  // Combine default styles with custom styles
  const containerStyle = {
    width,
    height,
    ...style,
  };

  return <div ref={container} style={containerStyle} />;
};

export default LottieAnimation;
