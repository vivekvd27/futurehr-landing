'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Honeycomb wireframe globe
function HoneycombGlobe({ hovered, onHoverChange }: { hovered: boolean; onHoverChange: (hovered: boolean) => void }) {
    // Create honeycomb pattern with circles
    const circleData = useMemo(() => {
      const circles: Array<{ 
        position: [number, number, number]; 
        rotation: [number, number, number]; 
        radius: number;
        originalPosition: THREE.Vector3;
      }> = [];
      const layers = 17;
      const circlesPerLayer = 28;
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
          });
        }
      }
      return circles;
    }, []);
  const globeRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      globeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      globeRef.current.children.forEach((child, i) => {
        const mesh = child.children[0] as THREE.Mesh;
        if (mesh && mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.opacity = 1;
          // Animate glow effect
          const wave = Math.sin(state.clock.elapsedTime * 1.5 + i * 0.3) * 0.5 + 0.5;
          const pulse = Math.sin(state.clock.elapsedTime * 2 + i * 0.15);
          const intensity = wave * 0.4 + pulse * 0.3 + 0.3;
          material.emissiveIntensity = hovered ? intensity + 0.5 : intensity;
        }
      });
      // Smooth scale animation for globe expansion on hover
      const targetScale = hovered ? 1.15 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * 0.1;
      globeRef.current.scale.setScalar(scaleRef.current);
    }
  });
  
  return (
    <group 
      ref={globeRef} 
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
    >
      {circleData.map((circle, i) => (
        <group key={i} position={circle.position} rotation={circle.rotation}>
          {/* Main sphere */}
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial 
              color={hovered ? "#a0ee22" : "#06b6d4"} 
              emissive={hovered ? "#eee022" : "#06b6d4"}
              emissiveIntensity={0.7}
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Energy particles bursting out
function EnergyParticles({ visible }: { visible: boolean }) {
  const particlesRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);
  
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
        size: 0.04 + Math.random() * 0.12,
        color: Math.random() > 0.85 ? (Math.random() > 0.5 ? '#06b6d4' : '#84cc16') : '#ffffff',
        initialDelay: Math.random() * 2
      });
    }
    
    return list;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      // If not visible, reset start time and hide all particles
      if (!visible) {
        startTimeRef.current = null;
        particlesRef.current.children.forEach((child) => {
          child.visible = false;
        });
        return;
      }
      
      // Set start time when hovering begins
      if (startTimeRef.current === null) {
        startTimeRef.current = state.clock.getElapsedTime();
      }
      
      const hoverTime = state.clock.getElapsedTime() - startTimeRef.current;
      
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        
        // Reset particle after delay
        if (hoverTime < particle.initialDelay) {
          child.visible = false;
          return;
        }
        
        child.visible = true;
        const localTime = (hoverTime - particle.initialDelay) % 4;
        
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
    <group ref={particlesRef} visible={visible}>
      {particles.map((particle, i) => (
        <mesh key={i} visible={false}>
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
  const [hovered, setHovered] = useState(false);
  
  return (
    <HoneycombGlobe 
      hovered={hovered}
      onHoverChange={setHovered}
    />
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
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#06b6d4" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#10b981" />
      <pointLight position={[0, 0, 8]} intensity={0.8} color="#06b6d4" />
      <directionalLight position={[3, 3, 3]} intensity={0.8} color="#06b6d4" />
      <directionalLight position={[-3, -3, -3]} intensity={0.6} color="#06b6d4" />
      <spotLight 
        position={[0, 10, 0]} 
        intensity={1} 
        angle={0.6} 
        penumbra={1} 
        color="#06b6d4"
      />
      
      <GlobeScene />
    </Canvas>
  );
}
