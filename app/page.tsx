"use client"

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { BackgroundBoxesDemo } from '@/components/BackgroundBoxesDemo'
import { Navbar } from '@/components/Navbar'
import { ProjectCard } from '@/components/ProjectCard'
import { SkillCard } from '@/components/SkillCard'

export default function Portfolio() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "center start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  const skills = [
    { name: 'React', imageURL: '/images/react.svg' },
    { name: 'Python', imageURL: '/images/python.svg' },
    { name: 'Next.JS', imageURL: '/images/Nextjs.svg' },
    { name: 'C', imageURL: '/images/c.svg' },
    { name: 'C++', imageURL: '/images/cpp.svg' },
    { name: 'JavaScript', imageURL: '/images/javascript.svg' },
    { name: 'Node.js', imageURL: '/images/nodejs.svg' },
    { name: 'Tensorflow', imageURL: '/images/tensorflow.svg' },
    { name: 'Flask', imageURL: '/images/flask.svg' },
    { name: 'GCloud', imageURL: '/images/gcloud.svg' },
    { name: 'MATLAB', imageURL: '/images/matlab.svg' }
  ]

  const projects = [
    // {
    //   title: 'guard.ai',
    //   description: 'Guard.AI is a cutting-edge solution designed to protect media authenticity from the rising threats of deepfake technology. Our platform leverages advanced decentralized technologies, and user-driven authentication.',
    //   technologies: ['Web3', 'Python', 'TensorFlow','Solidity','Next.js'],
    //   link: 'https://github.com/Pratz1337/guard.ai',
    // },
    {
      title: 'Gender Classification Model for Indian Faces',
      description: 'A deep learning model for gender classification trained specifically on Indian faces. Uses TensorFlow and Keras to predict male or female with high accuracy and confidence scores.',
      technologies: ['NumPy', 'Python', 'TensorFlow'],
      link: 'https://github.com/Pratz1337/Gender-Classification-Model-for-Indian-Faces',
    },
    {
      title: 'Symptom Sage',
      description: "Intuitive web application designed to detect pneumonia from chest X-rays, generate comprehensive reports pinpointing affected lung areas, and seamlessly connect doctors and patients. This application was awarded first place at the BIT INCEPTRA'24 Hackathon.",
      technologies: ['Tensorflow', 'GCloud', 'Python', 'Flask', 'JavaScript'],
      link: 'https://github.com/Pratz1337/Symptom_Sage',
    },
    {
      title: 'Radio Website Data Scraping',
      description: 'This Python script scrapes radio station data from a website and saves it to a CSV file. It utilizes BeautifulSoup for web scraping and requests for making HTTP requests.',
      technologies: ['BeautifulSoup', 'Python'],
      link: 'https://github.com/Pratz1337/Radio-Website-Data-Scraping',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <BackgroundBoxesDemo />
      <Navbar />

      <motion.section
        className="h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-4"
          >
            Prathmesh Sayal
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-300"
          >
            Lifelong Learner | CS Enthusiast
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="py-20 px-4 md:px-20 relative line-clamp-4 tracking-wide bg-white/10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-10 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ABOUT ME
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
              <Image
                src="/images/IMG_5029.webp"
                alt="Prathmesh Sayal"
                width={500}
                height={500}
                className="relative z-10 rounded-full w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg leading-relaxed text-gray-300">
              Hello! I'm Prathmesh Sayal, a passionate learner with a strong foundation in education.
              Currently, I am working in the field of Python, Web Development and
              AI-powered applications to exploring the potential of blockchain technology, I'm constantly 
              seeking new challenges and opportunities to grow.
            </p>
            <p className="text-lg leading-relaxed mt-4 text-gray-300">
              Feel free to reach out if you're interested in collaboration, networking, or sharing insights within the realm of technology and engineering.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="py-20 px-4 md:px-20 relative bg-white/10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-10 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          MY SKILLS
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="py-20 px-4 md:px-20 relative bg-white/10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-10 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </motion.section>

      <motion.footer
        className="py-10 text-center bg-white/10 backdrop-blur-sm"
        id='contact'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex justify-center space-x-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="https://github.com/pratz1337" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/prathmesh-sayal/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="mailto:prathmeshsayal8@gmail.com" className="text-white hover:text-gray-300 transition duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </a>
        </motion.div>
        <motion.p
          className='text-gray-300'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Contact Me ^^
        </motion.p>
      </motion.footer>
    </div>
  )
}

