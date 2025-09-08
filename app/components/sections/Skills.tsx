'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { skills } from '@/app/constants/content'
import SingleDiamond from '../3d/SingleDiamond'

interface SkillBarProps {
  skill: { name: string; level: number }
  index: number
}

function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-gray-300 font-medium">{skill.name}</h4>
        <span className="text-blue-400 font-semibold">{skill.level}%</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full relative"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const skillCategories = [
    { title: 'Technical Skills', skills: skills.technical, color: 'from-blue-500 to-blue-600' },
    { title: 'Financial Expertise', skills: skills.financial, color: 'from-green-500 to-blue-500' },
    { title: 'Soft Skills', skills: skills.soft, color: 'from-purple-500 to-blue-500' }
  ]

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Deep Dodger Blue Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/60 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-800/15 via-transparent to-blue-800/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/5 to-transparent" />
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-35">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.3} />
          
          <SingleDiamond position={[-3, 0, -2]} scale={2.6} color="#6495ed" />
          
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
              Skills
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive skillset spanning technical expertise, financial acumen, and leadership capabilities
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center mb-8">
                <div className={`w-1 h-8 bg-gradient-to-b ${category.color} rounded-full mr-4`}></div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    skill={skill}
                    index={skillIndex + categoryIndex * 6}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-gray-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center">Skill Highlights</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '📊', title: 'Data Analysis', desc: 'Advanced Excel & Analytics' },
                { icon: '💼', title: 'Leadership', desc: 'Team Management & Mentoring' },
                { icon: '🔍', title: 'Audit', desc: 'Compliance & Risk Assessment' },
                { icon: '📈', title: 'Strategy', desc: 'Financial Planning & Growth' }
              ].map((highlight, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-3">{highlight.icon}</div>
                  <h4 className="text-blue-400 font-bold mb-2">{highlight.title}</h4>
                  <p className="text-gray-300 text-sm">{highlight.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'QuickBooks', 'SAP', 'Excel', 'Tally ERP', 'Xero', 'Power BI', 
              'Tableau', 'SQL', 'Python', 'R', 'Peachtree', 'Sage 50'
            ].map((tool, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-gray-800/70 border border-gray-600/50 rounded-full text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}