'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ShinyReflectiveBlobProps {
  position?: [number, number, number]
  scale?: number
  color?: string
}

export default function ShinyReflectiveBlob({ 
  position = [2, 0, -1], 
  scale = 3, 
  color = '#1e90ff' 
}: ShinyReflectiveBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  // Create custom geometry with more detail
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 128, 128)
    const positions = geo.attributes.position.array as Float32Array
    
    // Add more organic blob-like distortion
    for (let i = 0; i < positions.length; i += 3) {
      const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
      const noise1 = Math.sin(vertex.x * 3) * Math.cos(vertex.y * 2) * 0.1
      const noise2 = Math.sin(vertex.y * 2.5) * Math.cos(vertex.z * 3) * 0.08
      const noise3 = Math.sin(vertex.z * 2) * Math.cos(vertex.x * 2.5) * 0.06
      
      vertex.normalize().multiplyScalar(1 + noise1 + noise2 + noise3)
      positions[i] = vertex.x
      positions[i + 1] = vertex.y
      positions[i + 2] = vertex.z
    }
    
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.4
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.4) * 0.2
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.004
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      
      // Breathing scale animation
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
      meshRef.current.scale.setScalar(breathe)
    }

    if (materialRef.current) {
      // Dynamic shimmer effect
      materialRef.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2.5) * 0.15
      
      // Subtle color shifting
      const hue = 0.55 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05 // Around blue hue
      materialRef.current.color.setHSL(hue, 0.8, 0.6)
      materialRef.current.emissive.setHSL(hue, 0.9, 0.3)
    }
  })

  return (
    <group>
      {/* Main reflective blob */}
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.95}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Outer glow effect */}
      <mesh position={position} scale={scale * 1.1} geometry={geometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Inner core for extra shine */}
      <mesh position={position} scale={scale * 0.7} geometry={geometry}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}