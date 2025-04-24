"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { big_sholders_text } from "@/lib/fonts";

const radius = 36;
const circumference = 2 * Math.PI * radius;

const CountdownCircle = ({ value, max, label, color, ring }) => {
  const progress = circumference - (value / max) * circumference;

  return (
    <div className="relative flex flex-col items-center gap-1">
      <svg width="90" height="90" className="rotate-[-90deg]">
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <motion.circle
          cx="45"
          cy="45"
          r={radius}
          fill="transparent"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          className={ring}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className={`${big_sholders_text.className} absolute top-7 text-2xl font-bold ${color}`}
        >
          {value}
        </motion.div>
      </AnimatePresence>

      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const diff = +new Date(targetDate) - +new Date();
    const t = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
    return t;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="w-full grid grid-cols-4 gap-6">
      <CountdownCircle
        value={timeLeft.days}
        max={60}
        label="Days"
        color="text-red-500"
        ring="stroke-red-400"
      />
      <CountdownCircle
        value={timeLeft.hours}
        max={24}
        label="Hours"
        color="text-purple-500"
        ring="stroke-purple-400"
      />
      <CountdownCircle
        value={timeLeft.minutes}
        max={60}
        label="Minutes"
        color="text-green-600"
        ring="stroke-green-500"
      />
      <CountdownCircle
        value={timeLeft.seconds}
        max={60}
        label="Seconds"
        color="text-teal-500"
        ring="stroke-teal-400"
      />
    </div>
  );
};

export default CountdownTimer;
