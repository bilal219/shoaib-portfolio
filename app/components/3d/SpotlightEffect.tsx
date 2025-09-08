'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpotlightEffectProps {
  position?: [number, number, number]
  target?: [number, number, number]
  intensity?: number
  color?: string
  angle?: number
}

export default function SpotlightEffect({
  position = [0, 10, 5],
  target = [0, 0, 0],
  intensity = 1,
  color = '#1e90ff',
  angle = 0.3
}: SpotlightEffectProps) {
  const spotlightRef = useRef<THREE.SpotLight>(null)
  const targetRef = useRef<THREE.Object3D>(null)

  useFrame((state) => {
    if (spotlightRef.current && targetRef.current) {
      // Moving spotlight effect
      const time = state.clock.elapsedTime * 0.5
      spotlightRef.current.position.x = position[0] + Math.sin(time) * 2
      spotlightRef.current.position.z = position[2] + Math.cos(time) * 2
      
      // Dynamic intensity
      spotlightRef.current.intensity = intensity + Math.sin(time * 2) * 0.2
    }
  })

  return (
    <>
      <spotLight
        ref={spotlightRef}
        position={position}
        angle={angle}
        penumbra={0.5}
        intensity={intensity}
        color={color}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        target={targetRef.current || undefined}
      />
      <object3D ref={targetRef} position={target} />
    </>
  )
}