'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getRandomFloat, getRandomInt } from '@/app/lib/utils'

interface DiamondProps {
  position: [number, number, number]
  scale: number
  rotationSpeed: [number, number, number]
  color: string
}

function Diamond({ position, scale, rotationSpeed, color }: DiamondProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1, 0)
    return geo
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed[0]
      meshRef.current.rotation.y += rotationSpeed[1] 
      meshRef.current.rotation.z += rotationSpeed[2]
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.2
    }

    if (materialRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 2 + position[0] * 0.1) * 0.1 + 0.1
      materialRef.current.emissiveIntensity = pulse
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.1}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

interface FloatingDiamondsProps {
  count?: number
  spread?: number
  colors?: string[]
}

export default function FloatingDiamonds({ 
  count = 12, 
  spread = 10,
  colors = ['#1e90ff', '#00bfff', '#4169e1', '#0099ff'] 
}: FloatingDiamondsProps) {
  const diamonds = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        getRandomFloat(-spread, spread),
        getRandomFloat(-spread/2, spread/2),
        getRandomFloat(-spread, spread)
      ] as [number, number, number],
      scale: getRandomFloat(0.1, 0.3),
      rotationSpeed: [
        getRandomFloat(-0.02, 0.02),
        getRandomFloat(-0.02, 0.02), 
        getRandomFloat(-0.02, 0.02)
      ] as [number, number, number],
      color: colors[getRandomInt(0, colors.length - 1)]
    }))
  }, [count, spread, colors])

  return (
    <group>
      {diamonds.map((diamond) => (
        <Diamond
          key={diamond.id}
          position={diamond.position}
          scale={diamond.scale}
          rotationSpeed={diamond.rotationSpeed}
          color={diamond.color}
        />
      ))}
    </group>
  )
}