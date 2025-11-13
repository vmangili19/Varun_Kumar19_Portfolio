"use client";

import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";

// Removed empty Props type (not needed)
export default function Skills() {
  const skills = [
    { image: "/Python.png", proficiency: 90 },
    { image: "/JavaScript.png", proficiency: 80 },
    { image: "/TypeScript.png", proficiency: 85 },
    { image: "/Nextjs.png", proficiency: 90 },
    { image: "/React.png", proficiency: 95 },
    { image: "/Nodejs.png", proficiency: 85 },
    { image: "/Express.png", proficiency: 80 },
    { image: "/Flask.png", proficiency: 75 },
    { image: "/PostgresSQL.png", proficiency: 80 },
    { image: "/Selenium.png", proficiency: 70 },
    { image: "/Git.png", proficiency: 90 },
    { image: "/GitHub.png", proficiency: 90 },
    { image: "/AWS.png", proficiency: 75 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>

      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 pt-40 px-4">
        {skills.map((skill, index) => (
          <Skill
            key={index}
            directionLeft={index % 2 === 0}
            skill={skill}
          />
        ))}
      </div>
    </motion.div>
  );
}
