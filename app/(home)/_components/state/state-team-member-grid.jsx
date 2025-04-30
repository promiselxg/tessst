"use client";

import { motion } from "framer-motion";
import TeamMemberCard from "./state-team-card";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TeamGrid({ team = [], state }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="bg-gray-100 rounded-lg p-6 mt-6"
    >
      <h2 className="text-center text-xl font-semibold mb-4">{state} Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((member, i) => (
          <TeamMemberCard key={i} {...member} />
        ))}
      </div>
    </motion.div>
  );
}
