"use client";

import { motion } from "framer-motion";

export default function Tabs({ activeTab, onChange }) {
  const tabs = ["national", "state", "affiliate"];

  return (
    <div className="relative flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="relative px-4 py-2 font-semibold text-gray-600 capitalize"
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
            />
          )}
        </button>
      ))}
    </div>
  );
}
