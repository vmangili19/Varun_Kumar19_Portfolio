"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image'; // Import the Image component

type Props = object; // Updated type definition

function ExperienceCard({}: Props) {
  return (
    <>
      {/* First Experience */}
      <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
        <motion.div
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{ duration: 1.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Image
            className="w-28 h-28 rounded-full xl:w-[130px] xl:h-[130px] object-cover object-center"
            src="/SomeshwaraTradingCompany.jpeg"
            alt="Someshwara Trading Company"
            width={112} // Set the width
            height={112} // Set the height
          />
        </motion.div>

        <div className="px-0 md:px-10">
          <h4 className="text-4xl font-light">Software Developer</h4>
          <p className="font-bold text-2xl mt-1">Trenika Technologies</p>
          <div className="flex space-x-2 my-2">
            <Image className="h-10 w-10 rounded-full" src="/Flask.png" alt="Flask" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/PostgresSQL.png" alt="PostgreSQL" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/Bootstrap.png" alt="Bootstrap" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/ploty.png" alt="Plotly" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/Selenium.png" alt="Selenium" width={40} height={40} />
          </div>
          <p className="py-5 text-gray-300">Tech Stack: Flask | PostgreSQL | Bootstrap5 | Plotly | Selenium</p>

          <ul className="list-disc space-y-4 ml-5 text-lg">
            <li>Built a Flask-SQLite platform for real-time onion price tracking.</li>
            <li>Developed interactive Plotly charts for price and crop trends.</li>
            <li>Implemented user authentication for farmers and buyers.</li>
            <li>Automated milestone alerts using Selenium.</li>
            <li>Designed a responsive UI with Bootstrap 5.</li>
            <li>Impact: Improved market transparency and supply chain efficiency.</li>
          </ul>
        </div>
      </article>

      {/* Second Experience */}
      <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
        <motion.div
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{ duration: 1.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Image
            className="w-28 h-28 rounded-full xl:w-[130px] xl:h-[130px] object-cover object-center"
            src="/UNCC.png"
            alt="UNCC"
            width={112} // Set the width
            height={112} // Set the height
          />
        </motion.div>

        <div className="px-0 md:px-10">
          <h4 className="text-4xl font-light">Graduate Teaching Assistant</h4>
          <p className="font-bold text-2xl mt-1">Course: Software Systems Design and Implementation</p>
          <div className="flex space-x-2 my-2">
            <Image className="h-10 w-10 rounded-full" src="/Python.png" alt="Python" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/React.png" alt="React" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/Nodejs.png" alt="Nodejs" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/Express.png" alt="Expressjs" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/Flask.png" alt="Flask" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/PostgresSQL.png" alt="PostgreSQL" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/AWS.png" alt="AWS" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/Docker.png" alt="Docker" width={40} height={40} />
            <Image className="h-10 w-10 rounded-full" src="/GitHub.png" alt="GitHub" width={40} height={40} />
          </div>
          <p className="py-5 text-gray-300">Tech Stack: Python | React | Node.js | Express.js | Flask | PostgreSQL | AWS | Docker | GitHub</p>

          <ul className="list-disc space-y-4 ml-5 text-lg">
            <li>Designed and implemented modular full-stack web applications to demonstrate core principles of software system architecture, microservices, and distributed design.</li>
            <li>Assisted faculty and 60+ graduate students in building, testing, and deploying RESTful APIs using Flask, Express.js, and Node.js.</li>
            <li>Improved backend performance by 30% through optimized database indexing and asynchronous request handling in PostgreSQL and AWS Lambda.</li>
            <li>Developed CI/CD pipelines using Docker and GitHub Actions, ensuring consistent builds and automated deployments.</li>
            <li>Conducted weekly code review and debugging sessions, mentoring peers on best practices in version control, modularization, and scalability.</li>
            <li>Collaborated with cross-functional student teams to architect fault-tolerant systems that met real-world reliability and scalability standards.</li>
          </ul>
        </div>
      </article>
    </>
  );
}

export default ExperienceCard;