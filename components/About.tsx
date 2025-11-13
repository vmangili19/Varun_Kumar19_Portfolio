"use client";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative min-h-screen text-center max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      {/* Section Title */}
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      {/* 👇 Video Section */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-40 w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg shadow-[#F7AB0A]/30"
      >
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/huA6W6oMBmk?rel=0&modestbranding=1"
            title="Varun Kumar Mangiligay Intro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.div>

      {/* 👇 About Box Section */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-10 max-w-3xl bg-[#1A1A1A]/70 backdrop-blur-md border border-[#F7AB0A]/20 rounded-2xl p-8 shadow-lg shadow-[#F7AB0A]/20 text-gray-300 text-left md:text-center"
      >
        <h4 className="text-4xl font-semibold text-center mb-6">
          🎬 Meet Varun Kumar Mangiligay —{" "}
          <span className="underline decoration-[#F7AB0A]/50">
            Building the Future
          </span>{" "}
          One Line at a Time
        </h4>

        <p className="text-base md:text-lg leading-relaxed">
          I’m a Full-Stack Developer and Software Engineer passionate about scalable and AI-driven systems. 
          I specialize in Flask, React, Node.js, and AWS, building apps that blend automation with intelligence. 
          At Someshwara Trading Company, I developed a real-time analytics platform improving market transparency. 
          As a Graduate Teaching Assistant at UNC Charlotte, I guided 60+ students in full-stack and cloud development. 
          My focus lies in AI automation, RAG chatbots, and data-centric engineering for smarter decision-making. 
          I’ve built an AI-powered LinkedIn Auto-Apply Bot that reduced manual effort by 70%. 
          Developed a RAG Chatbot on Amazon Bedrock with LangChain and OpenSearch for contextual intelligence. 
          I enjoy designing serverless architectures and integrating machine learning into production systems. 
          My strength lies in combining clean architecture, data insights, and user-centric design. 
          I believe in mentorship, collaboration, and engineering excellence through innovation. 
          Always learning, always building — turning ideas into meaningful technology.
        </p>
      </motion.div>
    </motion.div>
  );
}
