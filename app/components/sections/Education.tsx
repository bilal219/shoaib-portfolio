'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { education } from '@/app/constants/content'
import SingleDiamond from '../3d/SingleDiamond'

export default function Education() {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0
    }
  }

  return (
    <section id="education" className="relative py-20 overflow-hidden">
      {/* Deep Dodger Blue Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/50 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/10 via-transparent to-blue-800/10" />
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-35">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.3} />
          
          <SingleDiamond position={[-4, 1, -2]} scale={2.8} color="#4169e1" />
          
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
            My{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Education
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Building a strong foundation in accounting and finance through quality education
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Timeline Connector */}
                <div className="hidden lg:flex flex-col items-center">
                  <motion.div
                    className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-4 border-gray-900"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  />
                  {index < education.length - 1 && (
                    <div className="w-0.5 h-24 bg-gradient-to-b from-blue-500 to-transparent mt-4"></div>
                  )}
                </div>

                {/* Education Card */}
                <motion.div
                  className="flex-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, rotateY: -10 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                      <div className="text-blue-400 font-semibold mb-1">{edu.institution}</div>
                      <div className="text-gray-400 text-sm flex items-center gap-2">
                        <span>📍 {edu.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-300 font-semibold bg-blue-900/30 px-3 py-1 rounded-full text-sm">
                        {edu.year}
                      </div>
                      {edu.gpa && (
                        <div className="text-green-400 text-sm mt-2 font-medium">
                          GPA: {edu.gpa}
                        </div>
                      )}
                      {edu.grade && (
                        <div className="text-green-400 text-sm mt-2 font-medium">
                          Grade: {edu.grade}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-300 font-semibold mb-3">Relevant Coursework:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {edu.relevant.map((course, courseIndex) => (
                        <motion.div
                          key={courseIndex}
                          className="flex items-center space-x-2 text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: (index * 0.1) + (courseIndex * 0.1) }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{course}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-gray-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Continuous Learning</h3>
            <p className="text-gray-300 leading-relaxed">
              My educational journey doesn&apos;t stop here. I&apos;m constantly updating my skills through 
              professional certifications, online courses, and staying current with the latest 
              accounting standards and financial technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}