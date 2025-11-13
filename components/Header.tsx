"use client"; // Ensure this is a client-side component
import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center"
      >
        {/* Social Icons */}
        <SocialIcon
          url="https://www.linkedin.com/in/varun-kumar-mangiligay9194/"
          target="_blank"
          fgColor="#0077B5"
          bgColor="transparent"
        />
        {/*<SocialIcon
          url="https://www.instagram.com/mangiligayvarun/"
          target="_blank"
          fgColor="gray"
          bgColor="transparent"
        />*/}
        {/*<SocialIcon
          url="https://www.youtube.com/sonnysangha"
          target="_blank"
          fgColor="gray"
          bgColor="transparent"
        />*/}
      </motion.div>

      {/* Link to the contact section */}
      <Link href="#contact" passHref legacyBehavior>
        <motion.div
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-row items-center text-gray-300 cursor-pointer"
        >
          <div className="cursor-pointer">
            <SocialIcon
              network="email"
              fgColor="gray"
              bgColor="transparent"
            />
          </div>
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400 ml-2">
            Get In Touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}