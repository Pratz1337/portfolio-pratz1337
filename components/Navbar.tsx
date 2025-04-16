import React from 'react'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          Prathmesh Sayal
        </h1>
        <div className="flex items-center space-x-4">
          <a href="#about" className="text-white hover:text-gray-300 transition duration-300">About</a>
          <a href="#skills" className="text-white hover:text-gray-300 transition duration-300">Skills</a>
          <a href="#projects" className="text-white hover:text-gray-300 transition duration-300">Projects</a>
          <a href="#contact" className="text-white hover:text-gray-300 transition duration-300">Contact</a>
        </div>
      </div>
    </nav>
  )
}

