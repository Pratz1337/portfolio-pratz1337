import React from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  imageURL: string
}

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      className="flex-shrink-0 w-32 h-32 rounded-lg bg-white/10 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center p-4"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src={skill.imageURL} 
        alt={`${skill.name} logo`} 
        className="w-16 h-16 object-contain mb-2"
      />
      <span className="text-sm font-medium text-white text-center">
        {skill.name}
      </span>
    </motion.div>
  )
}

