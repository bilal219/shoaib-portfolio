'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { experience } from '@/app/constants/content'
import SingleDiamond from '../3d/SingleDiamond'

export default function Experience() {
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
    <section id="experience" className="relative py-20 overflow-hidden">
      {/* Deep Dodger Blue Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/70 to-black" />
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-transparent to-blue-900/20" />
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.3} />
          
          <SingleDiamond position={[5, -1, -2]} scale={3} color="#0099ff" />
          
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
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A progressive career journey in accounting and financial management
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Timeline */}
                <div className="lg:w-1/4 flex lg:flex-col items-center lg:items-end text-right">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">
                    {exp.period}
                  </div>
                  <div className="text-blue-400 text-sm font-medium">{exp.type}</div>
                  
                  {/* Timeline connector */}
                  <div className="hidden lg:flex flex-col items-center mt-4">
                    <motion.div
                      className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-4 border-gray-900"
                      whileInView={{ scale: [0, 1.3, 1] }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    />
                    {index < experience.length - 1 && (
                      <div className="w-0.5 h-20 bg-gradient-to-b from-blue-500 to-transparent mt-2"></div>
                    )}
                  </div>
                </div>

                {/* Experience Card */}
                <motion.div
                  className="lg:w-3/4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="text-blue-400 font-semibold text-lg mb-1">{exp.company}</div>
                      <div className="text-gray-400 flex items-center gap-2">
                        <span>📍 {exp.location}</span>
                      </div>
                    </div>
                    
                    <motion.div
                      className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-3 text-center"
                      whileHover={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-blue-300 font-bold text-lg">
                        {index === 0 ? 'Current' : `Role ${experience.length - index}`}
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <h4 className="text-gray-300 font-semibold mb-4">Key Achievements:</h4>
                    <div className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <motion.div
                          key={achIndex}
                          className="flex items-start space-x-3 group"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: (index * 0.1) + (achIndex * 0.1) }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-blue-500 rounded-full mt-2 group-hover:bg-blue-400 transition-colors duration-300"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                            {achievement}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Career Progression Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-gray-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center">Career Progression</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">$2M+</div>
                <div className="text-gray-300 text-sm">Transactions Managed</div>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50"
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-gray-300 text-sm">Compliance Record</div>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">30%</div>
                <div className="text-gray-300 text-sm">Process Improvement</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}