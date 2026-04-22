import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Float } from '@react-three/drei';

const TechGlobe = () => {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.1;
      wireframeRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Inner solid core */}
      <Icosahedron ref={meshRef} args={[1.2, 1]} scale={1}>
        <meshStandardMaterial 
          color="#6366f1" 
          transparent={true}
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
      
      {/* Outer wireframe network */}
      <Icosahedron ref={wireframeRef} args={[1.5, 2]} scale={1}>
        <meshStandardMaterial 
          color="#ec4899" 
          wireframe={true} 
          transparent={true}
          opacity={0.3}
        />
      </Icosahedron>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#6366f1" />
      <TechGlobe />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default HeroScene;
