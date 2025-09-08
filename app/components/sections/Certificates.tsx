'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { certificates } from '@/app/constants/content'
import SingleDiamond from '../3d/SingleDiamond'

export default function Certificates() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, rotateY: -15, y: 50 },
    visible: {
      opacity: 1,
      rotateY: 0,
      y: 0
    }
  }

  return (
    <section id="certificates" className="relative py-20 overflow-hidden">
      {/* Deep Dodger Blue Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/50 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/12 via-transparent to-blue-900/12" />
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.3} />
          
          <SingleDiamond position={[4, 2, -3]} scale={2.7} color="#87ceeb" />
          
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Certificates
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -10, rotateY: 5 }}
            >
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 h-full hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden">
                {/* Certificate Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  🏆
                </motion.div>

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 pr-8 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <div className="text-blue-400 font-semibold mb-1">{cert.issuer}</div>
                  <div className="text-gray-400 text-sm">{cert.date}</div>
                </div>

                {/* Credential ID */}
                <motion.div 
                  className="mb-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600/30"
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <div className="text-xs text-gray-400 mb-1">Credential ID</div>
                  <div className="text-blue-300 font-mono text-sm">{cert.credentialId}</div>
                </motion.div>

                {/* Description */}
                <div className="flex-1">
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {cert.description}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="mt-6 flex items-center justify-between">
                  <motion.div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cert.name.includes('In Progress')
                        ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30'
                        : 'bg-green-900/30 text-green-300 border border-green-500/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {cert.name.includes('In Progress') ? 'In Progress' : 'Certified'}
                  </motion.div>

                  <motion.div
                    className="text-blue-400 hover:text-blue-300 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15,3 21,3 21,9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </motion.div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-gray-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center">Certification Journey</h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">{certificates.length}</div>
                <div className="text-gray-300 text-sm">Total Certificates</div>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50"
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                <div className="text-3xl font-bold text-green-400 mb-2">{certificates.filter(c => !c.name.includes('In Progress')).length}</div>
                <div className="text-gray-300 text-sm">Completed</div>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">{certificates.filter(c => c.name.includes('In Progress')).length}</div>
                <div className="text-gray-300 text-sm">In Progress</div>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50"
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">2024</div>
                <div className="text-gray-300 text-sm">Latest Achievement</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I believe in continuous learning and staying current with industry best practices. 
            These certifications represent my commitment to professional excellence.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let&apos;s Discuss Opportunities
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}