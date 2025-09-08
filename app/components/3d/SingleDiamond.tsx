'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

interface SingleDiamondProps {
  position?: [number, number, number]
  scale?: number
  color?: string
}

export default function SingleDiamond({ 
  position = [3, 0, -2], 
  scale = 2, 
  color = '#1e90ff' 
}: SingleDiamondProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <Octahedron ref={meshRef} args={[1, 0]} scale={scale} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Octahedron>
    </Float>
  )
}