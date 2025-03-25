"use client";

import { useEffect, useState } from "react";

const SessionProvider = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <p>Loading session...</p>;

  return children;
};

export default SessionProvider;
