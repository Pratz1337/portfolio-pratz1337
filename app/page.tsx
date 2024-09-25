'use client'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { motion,useScroll,useTransform } from 'framer-motion'
import {  ChevronLeft, ChevronRight, Cloud } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { GithubIcon, Linkedin, Mail,  ExternalLink, Menu } from 'lucide-react'
interface Skill {
  name: string
  imageURL: string
}

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
    const updateCursorType = () => setIsPointer(window.getComputedStyle(document.elementFromPoint(position.x, position.y)).cursor === 'pointer')

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
        directionY: (Math.random() -0.5) * 2
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particleCount; i++) {
        let particle = particles[i]
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
          let particle2 = particles[j]
          let dx = particle.x - particle2.x
          let dy = particle.y - particle2.y
          let distance = Math.sqrt(dx * dx + dy * dy)

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
const SkillsVisualization = ({ skills }) => {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction) => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
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
    <div className="relative w-full">
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex-shrink-0 w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-center">
              {React.createElement(skill.icon, { size: 32, className: "mx-auto mb-2" })}
              <span>{skill.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-2xl font-bold mb-2 text-gray-800">{project.title}</h3>
      <p className="mb-4 text-gray-600">{project.description}</p>
      <div className="flex space-x-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        View Project <ExternalLink className="ml-1" size={16} />
      </a>
    </motion.div>
  )
}
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50  bg-white bg-opacity-20 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-gray-800 font-bold text-xl">Prathmesh Sayal</a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#about" className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#skills" className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Skills</a>
              <a href="#projects" className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
              <a href="#contact" className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-800">
                  <span className="sr-only">Open menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white text-gray-800">
                <nav className="flex flex-col space-y-4">
                  <a href="#about" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">About</a>
                  <a href="#skills" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Skills</a>
                  <a href="#projects" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                  <a href="#contact" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, 100])

  const skills: Skill[] = [
    { name: 'React', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s' },
    { name: 'Python', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png' },
    { name: 'Next.JS', imageUrl: 'https://images.ctfassets.net/c63hsprlvlya/IacLLeOBR5WCvdCPqKuff/6860b5cc464c4f54703a2befa3f706b4/nextjs3.webp' },
    { name: 'C', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png' },
    { name: 'C++', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg' },
    { name: 'JavaScript', imageUrl: 'https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png' },
    { name: 'Node.js', imageUrl: 'https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png' },
    { name: 'Tensorflow', imageUrl: 'https://pbs.twimg.com/profile_images/1103339571977248768/FtFnqC38_400x400.png' },
    { name: 'Flask', imageUrl: 'https://play-lh.googleusercontent.com/keVVojxW-b11NTKWZg8GulfLlhqBpATvqGFViblYsI0fxW_8a0sIPgyRlB94Gu1AQMY' },
    { name: 'GCloud', imageUrl: 'https://static-00.iconduck.com/assets.00/google-cloud-icon-2048x1646-7admxejz.png' },
    { name: 'MATLAB', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/800px-Matlab_Logo.png' },
  ]
  
  const projects = [
    {
      title: 'Gender-Classification-Model-for-Indian-Faces',
      description: 'A deep learning model for gender classification trained specifically on Indian faces. Uses TensorFlow and Keras to predict male or female with high accuracy and confidence scores. ',
      technologies: ['NumPy', 'Python', 'TensorFlow'],
      link: 'https://github.com/Pratz1337/Gender-Classification-Model-for-Indian-Faces',
    },
    {
      title: 'Symptom Sage',
      description: "Intuitive web application designed to detect pneumonia from chest X-rays, generate comprehensive reports pinpointing affected lung areas, and seamlessly connect doctors and patients. This application was awarded first place at the BIT INCEPTRA'24 Hackathon.",
      technologies: ['Tensorflow', 'GCloud', 'Python','Flask','JavaScript'],
      link: 'https://github.com/Pratz1337/Symptom_Sage',
    },
    {
      title: 'Radio Website Data Scraping',
      description: 'This Python script scrapes radio station data from a website and saves it to a CSV file. It utilizes BeautifulSoup for web scraping and requests for making HTTP requests. ',
      technologies: ['BeautifulSoup', 'Python'],
      link: 'https://github.com/Pratz1337/Radio-Website-Data-Scraping',
    },
  ]
  const SkillCard = ({ skill }: { skill: Skill }) => {
    const [imageError, setImageError] = useState(false)
  
    return (
      <motion.div
        className="flex-shrink-0 w-40 h-40 rounded-lg bg-white shadow-lg flex flex-col items-center justify-center p-4"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.12 }}
      >
        {!imageError ? (
          <img 
            src={skill.imageUrl} 
            alt={`${skill.name} logo`} 
            className="w-20 h-20 object-contain mb-2"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full mb-2">
            <span className="text-2xl font-bold text-gray-400">{skill.name[0]}</span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-800">{skill.name}</span>
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

// 
 

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      <CustomCursor />
      <LineBackground />
      <Navbar />

      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-4 text-gray-800"
          >
            Prathmesh Sayal
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600"
          >
            Lifelong Learner | CS Enthusiast
          </motion.p>
        </div>
      </section>

      <section id="about" className="py-20 px-4 md:px-20 relative line-clamp-4 tracking-wide">
        <motion.div
          style={{ y: yPosAnim }}
          className="absolute inset-0 bg-gray-100 opacity-50 skew-y-6 -z-10"
        />
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">About Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
              <Image
                src="/images/IMG_5029.webp"
                alt="Prathmesh Sayal"
                width={500}
                height={500}
                className="relative z-10 rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="text-lg leading-relaxed text-gray-600">
            Hello! I'm Prathmesh Sayal, a passionate learner with a strong foundation in education.
            Currently, I am working in the field of Python, Web Development and
            AI-powered applications to exploring the potential of blockchain technology, I'm constantly 
            seeking new challenges and opportunities to grow.
            </p>
            <p className="text-lg leading-relaxed mt-4 text-gray-600">
              When I'm not immersed in lines of code, you can find me participating in hackathons, 
              contributing to open-source & personal projects.
              Feel free to reach out if you're interested in collaboration, networking, or sharing insights within the realm of technology and engineering.

            </p>
          </div>
        </div>
      </section>
      <section id="skills" className="py-20 px-4 md:px-20 relative">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">My Skills</h2>
      <div className="relative w-full">
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
    <section id="projects" className="py-20 px-4 md:px-20 relative">
        <motion.div
          style={{ y: yPosAnim }}
          className="absolute inset-0 opacity-10 -skew-y-6 -z-10"
        />
        <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="py-10 text-center bg-gray-100 z-50" id='contact'>
        <div className="flex justify-center space-x-6 mb-6 z-50">
          <a href="https://github.com/pratz1337" target="_blank" className="text-gray-600 hover:text-gray-800 transition duration-300 z-50">
            <GithubIcon />
          </a>
          <a href="https://www.linkedin.com/in/prathmesh-sayal/" target="_blank" className="text-gray-600 hover:text-gray-800 transition duration-300 z-50">
            <Linkedin />
          </a>
          <a href="mailto:prathmeshsayal8@gmail.com" className="text-gray-600 hover:text-gray-800 transition duration-300 z-50">
            <Mail />
          </a>
        </div>
        <p className='text-gray-600 line-clamp-4 tracking-wide'>Contact  Me  ^^</p>
      </footer>
    </div>
  )
}