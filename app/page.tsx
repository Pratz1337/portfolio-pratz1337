'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { GithubIcon, Linkedin, Mail, ExternalLink, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface Skill {
  name: string
  imageURL: string
}

interface Project {
  title: string
  description: string
  technologies: string[]
  link: string
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
    const updateCursorType = () => {
      const element = document.elementFromPoint(position.x, position.y)
      setIsPointer(element ? window.getComputedStyle(element).cursor === 'pointer' : false)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateCursorType)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateCursorType)
    }
  }, [position])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 0.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  )
}

const LineBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; directionX: number; directionY: number }[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        directionX: (Math.random() + 0.5) * 2,
        directionY: (Math.random() - 0.5) * 2
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i]
        particle.x += particle.directionX
        particle.y += particle.directionY
    
        if (particle.x < 0 || particle.x > canvas.width) particle.directionX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.directionY *= -1
    
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(particle.x + particle.directionX * 50, particle.y + particle.directionY * 50)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.115)'
        ctx.stroke()
    
        for (let j = i + 1; j < particleCount; j++) {
          const particle2 = particles[j]
          const dx = particle.x - particle2.x
          const dy = particle.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
    
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.strokeStyle = `rgba(200, 200, 200, ${0.2 - distance / 750})`
            ctx.stroke()
          }
        }
      }
    }
    
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <motion.span
            key={tech}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Project <ExternalLink className="ml-1" size={16} />
      </motion.a>
    </motion.div>
  )
}

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [animatingTheme, setAnimatingTheme] = useState<'light' | 'dark' | null>(null)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setAnimatingTheme(newTheme)
    setTimeout(() => {
      setTheme(newTheme)
      setAnimatingTheme(null)
    }, 300) // Match this with the animation duration
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 backdrop-blur-lg shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-gray-800 dark:text-white font-bold text-xl">Prathmesh Sayal</a>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Skills</a>
              <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-4 relative z-50"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <div className="md:hidden ml-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-800 dark:text-white">
                    <span className="sr-only">Open menu</span>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                  <nav className="flex flex-col space-y-4">
                    <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                    <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Skills</a>
                    <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                    <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {animatingTheme && (
          <motion.div
            key={animatingTheme}
            initial={{ clipPath: `circle(0% at calc(100% - 4rem) 2rem)` }}
            animate={{ clipPath: `circle(150% at calc(100% - 4rem) 2rem)` }}
            exit={{ clipPath: `circle(0% at calc(100% - 4rem) 2rem)` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-0 z-40 ${
              animatingTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, 100])

  const skills: Skill[] = [
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
    {
      title: 'guard.ai',
      description: 'Guard.AI is a cutting-edge solution designed to protect media authenticity from the rising threats of deepfake technology. Our platform leverages advanced decentralized technologies, and user-driven authentication.',
      technologies: ['Web3', 'Python', 'TensorFlow','Solidity','Next.js'],
      link: 'https://github.com/Pratz1337/guard.ai',
    },
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

  const SkillCard = ({ skill }: { skill: Skill }) => {
    const [imageError, setImageError] = useState(false)
  
    return (
      <motion.div
        className="flex-shrink-0 w-40 h-40 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center justify-center p-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.12 }}
      >
        {!imageError ? (
          <motion.img 
            src={skill.imageURL} 
            alt={`${skill.name} logo`} 
            className="w-20 h-20 object-contain mb-2"
            onError={() => setImageError(true)}
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.div
            className="w-20 h-20 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">{skill.name[0]}</span>
          </motion.div>
        )}
        <motion.span
          className="text-sm font-medium text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {skill.name}
        </motion.span>
      </motion.div>
    )
  }
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -600 : 600
      container.scrollBy({ left: scrollAmount, behavior: 'auto' })
    }
  }

  const handleScroll = () => {
    const container = scrollRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      <CustomCursor />
      <LineBackground />
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
            className="text-6xl font-bold mb-4 text-gray-800 dark:text-white"
          >
            Prathmesh Sayal
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600 dark:text-gray-300"
          >
            Lifelong Learner | CS Enthusiast
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="py-20 px-4 md:px-20 relative line-clamp-4 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          style={{ y: yPosAnim }}
          className="absolute inset-0 bg-gray-100 dark:bg-gray-800 opacity-50 skew-y-6 -z-10"
        />
        <motion.h2
          className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white"
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
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse" />
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
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
      Hello! I&apos;m Prathmesh Sayal, a passionate learner with a strong foundation in education.
              Currently, I am working in the field of Python, Web Development and
      AI-powered applications to exploring the potential of blockchain technology, I&apos;m constantly 
              seeking new challenges and opportunities to grow.
            </p>
            <p className="text-lg leading-relaxed mt-4 text-gray-600 dark:text-gray-300">

      Feel free to reach out if you&apos;re interested in collaboration, networking, or sharing insights within the realm of technology and engineering.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="py-20 px-4 md:px-20 relative scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white scrollbar-hide"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          MY SKILLS
        </motion.h2>
        <div className="relative w-full scrollbar-hide">
          <motion.div 
            ref={scrollRef} 
            className="flex overflow-x-auto space-x-4 py-4 hide-scrollbar"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </motion.div>
          <AnimatePresence>
            {canScrollLeft && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2"
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {canScrollRight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="py-20 px-4 md:px-20 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          style={{ y: yPosAnim }}
          className="absolute inset-0 opacity-10 -skew-y-6 -z-10"
        />
        <motion.h2
          className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </motion.section>

      <motion.footer
        className="py-10 text-center bg-gray-100 dark:bg-gray-800 z-50"
        id='contact'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex justify-center space-x-6 mb-6 z-50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="https://github.com/pratz1337"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <GithubIcon />
            <span className="sr-only">GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/prathmesh-sayal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
          <motion.a
            href="mailto:prathmeshsayal8@gmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail />
            <span className="sr-only">Email</span>
          </motion.a>
        </motion.div>
        <motion.p
          className='text-gray-600 dark:text-gray-400 line-clamp-4 tracking-wide'
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