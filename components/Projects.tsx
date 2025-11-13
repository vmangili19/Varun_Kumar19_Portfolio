"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = object;

function Projects({}: Props) {
  const projects = [
    {
      id: 1,
      title: "Zero Waste Kitchen",
      description:
        "AI-powered web app to help households track groceries and cut food waste. Users log in with Firebase, manage an inventory with expiry color-codes & filters, and upload receipts that are parsed via OCR to auto-add items. An AI Recipe Generator (Groq) recommends meals using what’s already in the kitchen (Easy/Medium/Hard). Push notifications alert users 1/3/7 days before items expire, and an Admin Dashboard lets admins broadcast reminders. Frontend is Angular (Material UI, responsive). Backend is a Go/Gin REST API with JWT, PostgreSQL via GORM, and optional Docker deployment. Frontend hosted on Firebase.",
      image: "/Zero-Waste-Kitchen.png",
      technologies: [
        { id: 1, name: "Angular", image: "/Angular.png" },
        { id: 2, name: "GoLang", image: "/Go.png" },
        { id: 3, name: "PostgreSQL", image: "/PostgresSQL.png" },
        { id: 4, name: "Firebase", image: "/firebase-logo.png" },
        { id: 5, name: "Groq API", image: "/Groq.png" },
        { id: 6, name: "Docker", image: "/Docker.png" },
      ],
    },
    {
      id: 2,
      title: "LinkedIn Auto-Apply Job Bot",
      description:
        "An AI-powered automation tool that streamlines LinkedIn 'Easy Apply' submissions using rule-based job matching and human-like automation. It authenticates users, scores jobs by title/skills/eligibility, and auto-fills tailored forms—reducing manual effort by ~70%. Deployed with AWS EventBridge for scheduling, DynamoDB for tracking, S3 for logs, and CloudWatch for monitoring. Dockerized for easy deployment on EC2/Fargate. Processed 120+ job applications securely and efficiently with full cloud observability and automation reliability.",
      image: "/linkedin-bot.png",
      technologies: [
        { id: 1, name: "Python", image: "/Python.png" },
        { id: 2, name: "Selenium", image: "/Selenium.png" },
        { id: 3, name: "DynamoDB", image: "/AWS Dynamo DB.jpeg" },
        { id: 4, name: "S3", image: "/AWS S3.jpeg" },
        { id: 5, name: "EventBridge", image: "/AwS EventBridge.jpeg" },
        { id: 6, name: "Secrets Manager", image: "/AWS Secrets Manager.jpeg" },
        { id: 7, name: "CloudWatch", image: "/AWS Cloudwatch.png" },
        { id: 8, name: "Docker", image: "/Docker.png" },
      ],
    },
    {
      id: 3,
      title: "RAG Chatbot – Intelligent Knowledge-Augmented Assistant",
      description:
        "Built an AI-powered Retrieval-Augmented Generation (RAG) chatbot using Amazon Bedrock and LangChain to deliver document-aware responses. Integrated Amazon Lex V2, AWS Lambda, and API Gateway for seamless conversational flow and real-time RESTful interactions. Designed an S3-based knowledge base and OpenSearch vector retrieval for contextual query handling. Achieved sub-second latency and cost efficiency (~$0.01/hour) with a fully serverless architecture. Demonstrates strong expertise in cloud-native AI systems, LLM orchestration, and end-to-end AWS integration.",
      image: "/RAG Chatbot.png",
      technologies: [
        { id: 1, name: "Amazon Bedrock", image: "/Amazon Bedrock.jpeg" },
        { id: 2, name: "Amazon Lex", image: "/Amazon Lex.png" },
        { id: 3, name: "AWS Lambda", image: "/AWS Lambda.png" },
        { id: 4, name: "OpenSearch", image: "/Amazon opensearch serverless.jpeg" },
        { id: 5, name: "S3", image: "/Amazon S3.jpeg" },
        { id: 6, name: "LangChain", image: "/LangChain.png" },
        { id: 7, name: "Python", image: "/Python.png" },
        { id: 8, name: "API Gateway", image: "/Amazon API Gateway.png" },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col max-w-full min-h-screen mx-auto text-left"
    >
      {/* Section Heading */}
      <h3 className="absolute top-24 w-full text-center uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      {/* Scroll Wrapper */}
      <div
        className="
          w-full flex overflow-x-auto snap-x snap-mandatory
          scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80
          pt-40 pb-24
          z-20
        "
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="
              snap-center flex-shrink-0 w-screen flex flex-col
              items-center justify-start px-6 md:px-16 lg:px-28 space-y-10
            "
          >
            {/* Top Section: Screenshot */}
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="
                w-full max-w-xl md:max-w-2xl lg:max-w-3xl
                rounded-xl overflow-hidden
                border border-[#F7AB0A]/30 bg-black/40
                shadow-lg shadow-[#F7AB0A]/30
              "
            >
              <Image
                src={project.image}
                alt={`${project.title} Image`}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
            </motion.div>

            {/* Bottom Section: Text */}
            <div className="max-w-4xl w-full flex flex-col space-y-6 text-gray-300">
              {/* Title and counter */}
              <h4 className="text-2xl md:text-4xl font-semibold text-center text-white">
                <span className="underline decoration-[#F7AB0A]/50">
                  Case Study {i + 1} of {projects.length}:
                </span>{" "}
                {project.title}
              </h4>

              {/* Tech logos row */}
              <div className="flex flex-wrap items-center justify-center gap-5">
                {project.technologies.map((tech) => (
                  <div
                    key={tech.id}
                    className="flex flex-col items-center text-center"
                  >
                    <Image
                      src={tech.image}
                      alt={tech.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                    <span className="text-xs md:text-sm text-gray-300 mt-2">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description + impact box */}
              <div
                className="
                  mx-auto w-full rounded-lg border border-[#F7AB0A]/20
                  bg-[#0a0a0a]/60 p-5 md:p-6 leading-relaxed
                  text-sm md:text-lg text-gray-300
                "
              >
                {project.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gold background accent (kept) */}
      <div className="w-full absolute top-[30%] left-0 h-[500px] -skew-y-12 bg-[#F7AB0A]/10 blur-2xl opacity-30 pointer-events-none" />
    </motion.section>
  );
}

export default Projects;
