'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, GraduationCap, Briefcase, Settings, Award, Mail } from 'lucide-react'
import { personalInfo } from '@/app/constants/content'

export default function FloatingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navigationItems = useMemo(() => [
    { id: 'hero', label: 'Home', icon: Home, href: '#' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'education', label: 'Education', icon: GraduationCap, href: '#education' },
    { id: 'experience', label: 'Experience', icon: Briefcase, href: '#experience' },
    { id: 'skills', label: 'Skills', icon: Settings, href: '#skills' },
    { id: 'certificates', label: 'Certificates', icon: Award, href: '#certificates' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ], [])

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i] === 'hero' ? '' : sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navigationItems])

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Header - Top */}
      <motion.header
        className="fixed top-4 left-4 right-4 z-50 hidden lg:block"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 py-4 relative overflow-hidden">
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-400/5 pointer-events-none" />
            <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="text-2xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                {personalInfo.name}
              </span>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-400 bg-blue-900/30'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      layoutId="activeSection"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile/Tablet Header - Bottom */}
      <motion.div
        className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Floating Navigation Bar */}
        <div>
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-400/5 pointer-events-none" />
            {/* Quick Navigation Icons */}
            <div className="flex items-center justify-around px-4 py-3">
              {navigationItems.slice(0, 5).map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-400 bg-blue-900/40'
                      : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon size={20} />
                </motion.button>
              ))}
              
              {/* Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute bottom-full left-0 right-0 mb-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 relative overflow-hidden">
                  {/* Glossy overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-400/5 pointer-events-none" />
                  <div className="grid grid-cols-2 gap-3">
                    {navigationItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.href)}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          activeSection === item.id
                            ? 'text-blue-400 bg-blue-900/40'
                            : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}