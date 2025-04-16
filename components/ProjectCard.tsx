import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  technologies: string[]
  link: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
      <p className="mb-4 text-gray-300">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <motion.span
            key={tech}
            className="bg-white/20 text-white px-2 py-1 rounded text-sm"
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
        className="inline-flex items-center text-blue-400 hover:text-blue-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Project <ExternalLink className="ml-1" size={16} />
      </motion.a>
    </motion.div>
  )
}

