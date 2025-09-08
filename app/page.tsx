'use client'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Education from './components/sections/Education'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Certificates from './components/sections/Certificates'
import Contact from './components/sections/Contact'
import FloatingHeader from './components/ui/FloatingHeader'

export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {/* Global Background with Deep Dodger Blue Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950 to-black -z-20" />
      <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-blue-900/10 to-transparent -z-19" />
      <div className="fixed inset-0 bg-gradient-to-bl from-blue-950/20 via-transparent to-blue-950/20 -z-18" />
      
      {/* Animated background overlay */}
      <div className="fixed inset-0 opacity-30 -z-17">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/5 to-transparent animate-pulse" />
      </div>
      
      {/* Floating Header */}
      <FloatingHeader />
      
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Certificates />
      <Contact />
    </main>
  )
}