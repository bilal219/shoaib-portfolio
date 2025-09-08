'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { personalInfo } from '@/app/constants/content'
import SingleDiamond from '../3d/SingleDiamond'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink, Send, MessageSquare } from 'lucide-react'

export default function Contact() {
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

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: personalInfo.social.linkedin,
      icon: Linkedin,
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800'
    },
    {
      name: 'GitHub',
      url: personalInfo.social.github,
      icon: Github,
      color: 'from-gray-600 to-gray-700',
      hoverColor: 'hover:from-gray-700 hover:to-gray-800'
    },
    {
      name: 'Twitter',
      url: personalInfo.social.twitter,
      icon: Twitter,
      color: 'from-blue-400 to-blue-500',
      hoverColor: 'hover:from-blue-500 hover:to-blue-600'
    },
    {
      name: 'Email',
      url: personalInfo.social.email,
      icon: Mail,
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700'
    }
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email,
      action: `mailto:${personalInfo.email}`,
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: personalInfo.phone,
      action: `tel:${personalInfo.phone}`,
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: personalInfo.location,
      action: '#',
      color: 'text-purple-400'
    }
  ]

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Deep Dodger Blue Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/80 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 via-transparent to-blue-800/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-900/10 to-transparent" />
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-35">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.3} />
          
          <SingleDiamond position={[-5, -2, -3]} scale={3.2} color="#add8e6" />
          
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
            Get In{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to discuss opportunities? I&apos;d love to hear from recruiters and startups looking for 
            a dedicated accounting professional.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.action}
                    className="flex items-center space-x-4 p-4 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-blue-500/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className={`p-3 rounded-lg bg-gray-700/50 ${method.color} group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon size={24} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{method.title}</div>
                      <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{method.value}</div>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 ml-auto group-hover:text-blue-400 transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-3 p-4 bg-gradient-to-r ${social.color} ${social.hoverColor} text-white rounded-xl shadow-lg transition-all duration-300 group`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              className="bg-gradient-to-r from-blue-900/30 to-gray-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-bold text-blue-400 mb-4">Quick Facts</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-gray-300">
                  <span className="text-blue-400">📍</span> Available for opportunities
                </div>
                <div className="text-gray-300">
                  <span className="text-blue-400">💼</span> Open to remote work
                </div>
                <div className="text-gray-300">
                  <span className="text-blue-400">⏱️</span> Response within 24 hours
                </div>
                <div className="text-gray-300">
                  <span className="text-blue-400">🌍</span> Available for relocation
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form / Call to Action */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MessageSquare className="mr-3 text-blue-400" size={28} />
                Let&apos;s Start a Conversation
              </h3>
              
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  I&apos;m actively seeking new opportunities in accounting and finance. Whether you&apos;re 
                  a recruiter looking for talent or a startup needing financial expertise, I&apos;d love 
                  to discuss how I can contribute to your organization&apos;s success.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/30">
                    <h4 className="text-blue-400 font-semibold mb-2">What I&apos;m Looking For:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Senior Accounting positions</li>
                      <li>• Financial Analyst roles</li>
                      <li>• Startup CFO opportunities</li>
                      <li>• Consulting engagements</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/30">
                    <h4 className="text-blue-400 font-semibold mb-2">What I Offer:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• 3+ years of progressive experience</li>
                      <li>• Strong analytical and leadership skills</li>
                      <li>• Modern accounting technology expertise</li>
                      <li>• Startup and enterprise experience</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={personalInfo.social.email}
                    className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={20} />
                    <span className="font-semibold">Send Email</span>
                  </motion.a>

                  <motion.a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Linkedin size={20} />
                    <span className="font-semibold">LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              className="text-center p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm border border-green-500/30 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold">Available for New Opportunities</span>
              </div>
              <p className="text-gray-300 text-sm">
                Currently accepting interviews and ready to start immediately
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 pt-8 border-t border-gray-700/50 text-center"
        >
          <p className="text-gray-400 mb-4">
            © 2024 {personalInfo.name}. Professional Portfolio
          </p>
          <p className="text-gray-500 text-sm">
            Built with Next.js, Three.js, and modern web technologies
          </p>
        </motion.div>
      </div>
    </section>
  )
}