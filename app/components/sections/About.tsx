'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { about, personalInfo } from '@/app/constants/content'
import SingleDiamond from '../3d/SingleDiamond'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Deep Dodger Blue Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/60 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/15 via-transparent to-blue-900/15" />
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.3} />
          
          <SingleDiamond position={[4, 0, -3]} scale={2.5} color="#1e90ff" />
          
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                variants={itemVariants}
              >
                About{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Me
                </span>
              </motion.h2>
              
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-8"
                variants={itemVariants}
              />
            </div>

            <motion.div variants={itemVariants} className="space-y-6">
              {about.description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Key Highlights</h3>
              <div className="grid gap-4">
                {about.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="pt-6"
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Experience
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats/Info Cards */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.div className="grid grid-cols-2 gap-4">
              <motion.div
                className="p-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl text-center hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">3+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </motion.div>

              <motion.div
                className="p-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl text-center hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
              </motion.div>

              <motion.div
                className="p-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl text-center hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-gray-300 text-sm">Clients Served</div>
              </motion.div>

              <motion.div
                className="p-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl text-center hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                <div className="text-gray-300 text-sm">Certifications</div>
              </motion.div>
            </motion.div>

            <motion.div
              className="p-6 bg-gradient-to-br from-blue-900/30 to-gray-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-xl font-semibold text-blue-400 mb-4">Contact Information</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>📍 {personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>✉️ Available for opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>🚀 Open to remote work</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}