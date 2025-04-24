"use client";

import useConfettiStore from "@/store/confettiStore";
import ReactConfetti from "react-confetti";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isConfettiVisible) return null;
  return (
    <ReactConfetti
      className="pointer-events-none z-[100] w-full"
      numberOfPieces={800}
      recycle={false}
      onConfettiComplete={() => {
        confetti.hideConfetti();
      }}
    />
  );
};
