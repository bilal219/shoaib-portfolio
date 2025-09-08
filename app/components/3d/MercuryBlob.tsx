'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface MercuryBlobProps {
  position?: [number, number, number]
  scale?: number
}

export default function MercuryBlob({ position = [0, 0, 0] }: MercuryBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group>
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Main mercury blob */}
        <Sphere
          ref={meshRef}
          args={[1.5, 128, 128]}
          scale={hovered ? 1.1 : 1}
          position={position}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#4a4a4a" : "#2a2a2a"}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.05}
            metalness={0.9}
            envMapIntensity={0.8}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            reflectivity={0.7}
            transparent={false}
            opacity={1}
          />
        </Sphere>
        
        {/* Blue-tinted reflective rim effect */}
        <Sphere
          args={[1.52, 64, 64]}
          scale={hovered ? 1.1 : 1}
          position={position}
        >
          <meshBasicMaterial
            color="#1e90ff"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Subtle blue inner glow */}
        <Sphere
          args={[1.48, 32, 32]}
          scale={hovered ? 1.1 : 1}
          position={position}
        >
          <meshBasicMaterial
            color="#4169e1"
            transparent
            opacity={0.08}
          />
        </Sphere>
      </Float>
    </group>
  )
}