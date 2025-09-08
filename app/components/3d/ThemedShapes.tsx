'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box, Cylinder, Octahedron } from '@react-three/drei'
import * as THREE from 'three'
import { getRandomFloat, getRandomInt } from '@/app/lib/utils'

interface ThemedShapeProps {
  position: [number, number, number]
  scale: number
  rotationSpeed: [number, number, number]
  color: string
  shapeType: 'diamond' | 'cube' | 'cylinder' | 'sphere'
  icon?: string
}

function ThemedShape({ position, scale, rotationSpeed, color, shapeType, icon }: ThemedShapeProps) {
  const meshRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed[0]
      meshRef.current.rotation.y += rotationSpeed[1] 
      meshRef.current.rotation.z += rotationSpeed[2]
      
      // Enhanced floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.5
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.8 + position[1]) * 0.3
    }

    if (materialRef.current) {
      // Enhanced pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 1.8 + position[0] * 0.1) * 0.2 + 0.3
      materialRef.current.emissiveIntensity = pulse
    }
  })

  const renderShape = () => {
    switch (shapeType) {
      case 'diamond':
        return (
          <Octahedron scale={scale}>
            <meshStandardMaterial
              ref={materialRef}
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              roughness={0.1}
              metalness={0.8}
              transparent
              opacity={0.9}
            />
          </Octahedron>
        )
      case 'cube':
        return (
          <Box scale={scale}>
            <meshStandardMaterial
              ref={materialRef}
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.7}
              transparent
              opacity={0.9}
            />
          </Box>
        )
      case 'cylinder':
        return (
          <Cylinder scale={scale} args={[1, 1, 2, 32]}>
            <meshStandardMaterial
              ref={materialRef}
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              roughness={0.15}
              metalness={0.8}
              transparent
              opacity={0.9}
            />
          </Cylinder>
        )
      case 'sphere':
        return (
          <mesh scale={scale}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              ref={materialRef}
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.9}
            />
          </mesh>
        )
      default:
        return null
    }
  }

  return (
    <group ref={meshRef} position={position}>
      {renderShape()}
      
      {/* Icon text on the shape */}
      {icon && (
        <Text
          position={[0, 0, scale + 0.5]}
          fontSize={scale * 0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      )}
      
      {/* Subtle glow ring around the shape */}
      <mesh position={[0, 0, 0]} scale={scale * 1.3}>
        <ringGeometry args={[1, 1.2, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

interface ThemedShapesProps {
  count?: number
  spread?: number
  colors?: string[]
  theme: 'education' | 'experience' | 'skills' | 'certificates' | 'about' | 'contact'
}

export default function ThemedShapes({ 
  count = 8, 
  spread = 12,
  colors = ['#1e90ff', '#4169e1', '#00bfff', '#0099ff'],
  theme 
}: ThemedShapesProps) {
  
  const getThemeConfig = () => {
    switch (theme) {
      case 'education':
        return {
          shapes: ['cube', 'cylinder'] as const,
          icons: ['📚', '🎓', '📖', '✏️', '📝', '🧮', '📊', '💼'],
          baseScale: 0.8
        }
      case 'experience':
        return {
          shapes: ['diamond', 'cube', 'cylinder'] as const,
          icons: ['💼', '📈', '🏆', '⚡', '🎯', '💡', '🚀', '⭐'],
          baseScale: 1.0
        }
      case 'skills':
        return {
          shapes: ['sphere', 'diamond', 'cube'] as const,
          icons: ['⚙️', '💻', '📊', '🧮', '📈', '🔧', '💎', '🎨'],
          baseScale: 0.9
        }
      case 'certificates':
        return {
          shapes: ['diamond', 'cylinder'] as const,
          icons: ['🏆', '🎖️', '⭐', '💯', '✨', '🎗️', '👑', '🔥'],
          baseScale: 1.1
        }
      case 'about':
        return {
          shapes: ['diamond', 'sphere'] as const,
          icons: ['💼', '🎯', '💡', '⚡', '🌟', '💫', '🚀', '📊'],
          baseScale: 0.7
        }
      case 'contact':
        return {
          shapes: ['sphere', 'diamond', 'cube', 'cylinder'] as const,
          icons: ['📧', '📱', '💬', '🌐', '🤝', '📞', '✉️', '🗨️'],
          baseScale: 1.2
        }
      default:
        return {
          shapes: ['diamond'] as const,
          icons: ['💎'],
          baseScale: 1.0
        }
    }
  }

  const themeConfig = getThemeConfig()

  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        getRandomFloat(-spread, spread),
        getRandomFloat(-spread/2, spread/2),
        getRandomFloat(-spread, spread)
      ] as [number, number, number],
      scale: themeConfig.baseScale * getRandomFloat(0.8, 1.4),
      rotationSpeed: [
        getRandomFloat(-0.01, 0.01),
        getRandomFloat(-0.01, 0.01), 
        getRandomFloat(-0.01, 0.01)
      ] as [number, number, number],
      color: colors[getRandomInt(0, colors.length - 1)],
      shapeType: themeConfig.shapes[getRandomInt(0, themeConfig.shapes.length - 1)],
      icon: themeConfig.icons[getRandomInt(0, themeConfig.icons.length - 1)]
    }))
  }, [count, spread, colors, themeConfig])

  return (
    <group>
      {shapes.map((shape) => (
        <ThemedShape
          key={shape.id}
          position={shape.position}
          scale={shape.scale}
          rotationSpeed={shape.rotationSpeed}
          color={shape.color}
          shapeType={shape.shapeType}
          icon={shape.icon}
        />
      ))}
    </group>
  )
}