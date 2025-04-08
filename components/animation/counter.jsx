"use client";

import { useEffect, useState } from "react";

export const Counter = ({
  targetNumber = 100,
  duration = 2000,
  suffix = "+",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = targetNumber / (duration / 10);

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        start = targetNumber;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 10);

    return () => clearInterval(counter);
  }, [targetNumber, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};
