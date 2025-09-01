import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FogParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      // Spread particles across a wide area
      positions[i * 3] = (Math.random() - 0.5) * 30; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
      
      // Very subtle red-tinted fog colors
      // White/gray star-like particles
      const intensity = Math.random() * 0.3 + 0.7;
      colors[i * 3] = intensity; // red
      colors[i * 3 + 1] = intensity; // green
      colors[i * 3 + 2] = intensity; // blue
    }
    
    return [positions, colors];
  }, []);

  // Animate the fog particles
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire particle system slowly
      ref.current.rotation.y = time * 0.02;
      ref.current.rotation.x = Math.sin(time * 0.015) * 0.05;
      
      // Update individual particle positions for flowing effect
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Create flowing motion
        positions[i] += Math.sin(time * 0.2 + positions[i + 2]) * 0.0005; // x drift
        positions[i + 1] += Math.cos(time * 0.15 + positions[i]) * 0.0003; // y drift
        positions[i + 2] += Math.sin(time * 0.1 + positions[i + 1]) * 0.0004; // z drift
        
        // Wrap particles that drift too far
        if (positions[i] > 15) positions[i] = -15;
        if (positions[i] < -15) positions[i] = 15;
        if (positions[i + 1] > 7.5) positions[i + 1] = -7.5;
        if (positions[i + 1] < -7.5) positions[i + 1] = 7.5;
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        opacity={0.6}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const HeroFog: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <FogParticles />
        
        {/* Additional fog layers for depth */}
        <group position={[3, -1.5, -3]} scale={0.6}>
          <FogParticles />
        </group>
        <group position={[-4, 2, -4]} scale={0.9}>
          <FogParticles />
        </group>
        <group position={[1, -2, -5]} scale={0.4}>
          <FogParticles />
        </group>
      </Canvas>
    </div>
  );
};

export default HeroFog;