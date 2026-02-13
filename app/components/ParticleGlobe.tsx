'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Honeycomb wireframe globe
function HoneycombGlobe({ exploded, onExplode }: { exploded: boolean; onExplode: () => void }) {
  const globeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  
  // Create honeycomb pattern with circles
  const circleData = useMemo(() => {
    const circles: Array<{ 
      position: [number, number, number]; 
      rotation: [number, number, number]; 
      radius: number;
      originalPosition: THREE.Vector3;
      velocity: THREE.Vector3;
    }> = [];
    const layers = 12;
    const circlesPerLayer = 16;
    const radius = 2;
    
    for (let i = 0; i < layers; i++) {
      const phi = (Math.PI * i) / (layers - 1);
      const y = radius * Math.cos(phi);
      const ringRadius = radius * Math.sin(phi);
      
      const numCircles = Math.max(4, Math.floor(circlesPerLayer * Math.sin(phi)));
      
      for (let j = 0; j < numCircles; j++) {
        const theta = (2 * Math.PI * j) / numCircles;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);
        
        const pos = new THREE.Vector3(x, y, z);
        
        circles.push({
          position: [x, y, z],
          rotation: [phi, theta, 0],
          radius: 0.18,
          originalPosition: pos.clone(),
          velocity: pos.clone().normalize().multiplyScalar(2 + Math.random() * 3)
        });
      }
    }
    
    return circles;
  }, []);
  
  useFrame((state) => {
    if (globeRef.current && !exploded) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      globeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
    
    // Explosion animation
    if (exploded && globeRef.current) {
      const explosionTime = state.clock.getElapsedTime() % 6;
      
      if (explosionTime < 2.5) {
        // Explode outward
        globeRef.current.children.forEach((child, i) => {
          const data = circleData[i];
          const t = Math.min(explosionTime / 2.5, 1);
          const easeOut = 1 - Math.pow(1 - t, 3);
          
          child.position.lerpVectors(
            data.originalPosition,
            data.originalPosition.clone().add(data.velocity.clone().multiplyScalar(easeOut)),
            t
          );
          
          // Fade out
          const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          material.opacity = 1 - easeOut * 0.7;
          
          // Random rotation during explosion
          child.rotation.x += 0.05;
          child.rotation.y += 0.03;
        });
      } else if (explosionTime < 3) {
        // Hold dispersed
        globeRef.current.children.forEach((child) => {
          const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          material.opacity = 0.3;
        });
      } else {
        // Reassemble
        const reassembleTime = (explosionTime - 3) / 3;
        const easeIn = reassembleTime * reassembleTime;
        
        globeRef.current.children.forEach((child, i) => {
          const data = circleData[i];
          const dispersedPos = data.originalPosition.clone().add(data.velocity);
          
          child.position.lerpVectors(
            dispersedPos,
            data.originalPosition,
            easeIn
          );
          
          // Fade back in
          const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          material.opacity = 0.3 + easeIn * 0.7;
        });
      }
    }
  });
  
  // Handle click
  const handleClick = () => {
    onExplode();
  };
  
  return (
    <group 
      ref={globeRef} 
      onClick={handleClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {circleData.map((circle, i) => (
        <mesh 
          key={i} 
          position={circle.position} 
          rotation={circle.rotation}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={hovered ? "#22d3ee" : "#06b6d4"} 
            emissive={hovered ? "#22d3ee" : "#06b6d4"}
            emissiveIntensity={hovered ? 0.8 : 0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Energy particles bursting out
function EnergyParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const count = 80;
    const list: Array<{
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      size: number;
      color: string;
      initialDelay: number;
    }> = [];
    
    // Origin point on the globe surface
    const originX = -1.5;
    const originY = 0.3;
    const originZ = 1.2;
    
    for (let i = 0; i < count; i++) {
      // Random direction but mostly in one hemisphere
      const theta = Math.random() * Math.PI * 0.6 - Math.PI * 0.3;
      const phi = Math.random() * Math.PI * 0.4 + Math.PI * 0.3;
      
      const speed = 0.3 + Math.random() * 0.8;
      
      list.push({
        position: new THREE.Vector3(originX, originY, originZ),
        velocity: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        ),
        size: 0.05 + Math.random() * 0.25,
        color: Math.random() > 0.85 ? (Math.random() > 0.5 ? '#06b6d4' : '#84cc16') : '#ffffff',
        initialDelay: Math.random() * 2
      });
    }
    
    return list;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        const time = state.clock.getElapsedTime();
        
        // Reset particle after delay
        if (time < particle.initialDelay) {
          child.visible = false;
          return;
        }
        
        child.visible = true;
        const localTime = (time - particle.initialDelay) % 4;
        
        // Update position
        child.position.x = particle.position.x + particle.velocity.x * localTime;
        child.position.y = particle.position.y + particle.velocity.y * localTime;
        child.position.z = particle.position.z + particle.velocity.z * localTime;
        
        // Fade out as particles move away
        const distance = localTime / 4;
        const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        material.opacity = Math.max(0, 1 - distance * 1.2);
        material.emissiveIntensity = Math.max(0, 1 - distance);
        
        // Scale down slightly over time
        const scale = 1 - distance * 0.3;
        child.scale.setScalar(scale);
      });
    }
  });
  
  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshStandardMaterial 
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.8}
            metalness={0.3}
            roughness={0.4}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function GlobeScene() {
  const [exploded, setExploded] = useState(false);
  
  const handleExplode = () => {
    setExploded(true);
  };
  
  return (
    <>
      <HoneycombGlobe exploded={exploded} onExplode={handleExplode} />
      <EnergyParticles />
    </>
  );
}

export default function ParticleGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100%', height: '100%', cursor: 'pointer', background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Enhanced lighting for 3D effect */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#10b981" />
      <spotLight 
        position={[0, 10, 0]} 
        intensity={1} 
        angle={0.6} 
        penumbra={1} 
        color="#ffffff"
      />
      
      <GlobeScene />
    </Canvas>
  );
}
