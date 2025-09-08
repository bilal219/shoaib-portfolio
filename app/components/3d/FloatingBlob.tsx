'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingBlobProps {
  position?: [number, number, number]
  scale?: number
  color?: string
}

export default function FloatingBlob({ position = [0, 0, 0], scale = 1, color = '#1e90ff' }: FloatingBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64)
    const positions = geo.attributes.position.array as Float32Array
    
    // Add noise to create blob-like appearance
    for (let i = 0; i < positions.length; i += 3) {
      const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
      const noise = Math.sin(vertex.x * 2) * Math.cos(vertex.y * 2) * Math.sin(vertex.z * 2) * 0.1
      vertex.normalize().multiplyScalar(1 + noise)
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
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.6) * 0.1
    }

    if (materialRef.current) {
      // Shimmer effect
      materialRef.current.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}