"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingParticles: React.FC = () => {
  const count = 100;
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);
  const [isDark, setIsDark] = useState(false);
  
  const particles = React.useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        )
      );
    }
    return positions;
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(isDark ? '#ffffff' : '#0077b6');
    }
  }, [isDark]);

  useFrame((state) => {
    if (mesh.current) {
      const temp = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        const time = state.clock.elapsedTime;
        temp.position.set(
          particles[i].x + Math.sin(time + i) * 0.5,
          particles[i].y + Math.cos(time + i) * 0.5,
          particles[i].z + Math.sin(time * 0.5 + i) * 0.5
        );
        temp.updateMatrix();
        mesh.current.setMatrixAt(i, temp.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.032, 8, 8]} />
      <meshBasicMaterial ref={materialRef} color={isDark ? "#ffffff" : "#0077b6"} transparent opacity={0.6} />
    </instancedMesh>
  );
};

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.3} 
        color="#60A5FA" 
      />
      <pointLight 
        position={[5, 5, 10]} 
        intensity={0.4} 
        color="#60A5FA" 
      />
      <pointLight 
        position={[-5, -5, 10]} 
        intensity={0.3} 
        color="#8B5CF6" 
      />
      <spotLight
        position={[0, 8, 5]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={2.0}
        color="#60A5FA"
        target-position={[0, 0, 0]}
      />
      <FloatingParticles />
    </>
  );
}

export default function AnimatedSphereBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Light mode background */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: `radial-gradient(ellipse at 15% 15%, var(--color-bg-light-start) 60%, var(--color-bg-light-end) 100%)`
        }}
      />
      
      {/* Dark mode background */}
      <div className="absolute inset-0 hidden dark:block bg-black" />
      
      {/* Dark mode spotlight */}
      <div 
        className="absolute inset-0 hidden dark:block" 
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(53, 167, 255, 0.15) 0%, transparent 65%),
            radial-gradient(circle at 70% 60%, rgba(53, 167, 255, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)
          `
        }}
      />
      
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}