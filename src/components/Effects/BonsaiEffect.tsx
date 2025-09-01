import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { TreePine } from 'lucide-react';

const BonsaiIcon: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animate subtle floating motion
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Very subtle floating motion
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.02;
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.005;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Create a 3D tree-like structure using basic geometries */}
      {/* Tree trunk */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
      
      {/* Tree foliage - main canopy */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.8, 12, 8]} />
        <meshLambertMaterial color="#228B22" />
      </mesh>
      
      {/* Additional foliage layers for bonsai-like appearance */}
      <mesh position={[-0.3, -0.1, 0.2]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshLambertMaterial color="#32CD32" />
      </mesh>
      
      <mesh position={[0.4, 0.1, -0.1]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshLambertMaterial color="#228B22" />
      </mesh>
      
      <mesh position={[0, 0.6, 0.1]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshLambertMaterial color="#32CD32" />
      </mesh>
    </group>
  );
};

const FloatingParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate particles around the bonsai
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      // Position particles in a sphere around the bonsai
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) - 1;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Reddish autumn colors
      const intensity = Math.random() * 0.3 + 0.2;
      colors[i * 3] = 0.8 + Math.random() * 0.2; // red
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // green
      colors[i * 3 + 2] = 0.1 + Math.random() * 0.2; // blue
    }
    
    return [positions, colors];
  }, []);

  // Animate particles with gentle floating motion
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle rotation
      ref.current.rotation.y = time * 0.05;
      
      // Update particle positions for floating effect
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating motion
        positions[i + 1] += Math.sin(time * 0.5 + positions[i]) * 0.001;
        positions[i] += Math.cos(time * 0.3 + positions[i + 2]) * 0.0005;
        
        // Reset particles that float too high
        if (positions[i + 1] > 3) {
          positions[i + 1] = -3;
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        opacity={0.4}
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const BonsaiEffect: React.FC = () => {
  return (
    <div className="w-64 h-64 mx-auto mb-4">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.6} />
        
        {/* Directional light for depth */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.4}
          color="#881337"
        />
        
        {/* Point light for warmth */}
        <pointLight 
          position={[-3, 2, 3]} 
          intensity={0.3}
          color="#9F1239"
        />
        
        {/* The bonsai 3D model */}
        <BonsaiIcon />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Additional particle layers for depth */}
        <group position={[1, -0.5, -1]} scale={0.6}>
          <FloatingParticles />
        </group>
        <group position={[-1, 0.5, -2]} scale={0.4}>
          <FloatingParticles />
        </group>
      </Canvas>
    </div>
  );
};

export default BonsaiEffect;