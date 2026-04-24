import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating code node sphere
const CodeNode = ({ position, color, scale = 1 }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={position} scale={scale * 0.6}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

// Animated edge line between two points
const ConnectionLine = ({ start, end, color }) => {
  const ref = useRef();

  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end]
  );
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
};

// Main rotating outer ring
const OuterRing = () => {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2.8, 0.015, 8, 80]} />
        <meshStandardMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.8, 0.015, 8, 80]} />
        <meshStandardMaterial color="#ec4899" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// Core pulsing CPU-like structure
const CoreMesh = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshStandardMaterial
          color="#6366f1"
          transparent
          opacity={0.12}
          wireframe={false}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
};

const nodeData = [
  { pos: [2.4, 0.6, 0.8],   color: '#6366f1', scale: 1.0 },
  { pos: [-2.2, 0.8, -0.5], color: '#ec4899', scale: 0.85 },
  { pos: [0.5, 2.4, -1.0],  color: '#22d3ee', scale: 0.9 },
  { pos: [-0.8, -2.3, 0.7], color: '#a78bfa', scale: 0.8 },
  { pos: [1.8, -1.5, -1.2], color: '#34d399', scale: 0.75 },
  { pos: [-1.6, -0.8, 2.0], color: '#f59e0b', scale: 0.7 },
];

const connections = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 2], [0, 4],
];

const SWEScene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-5, -5, 3]} intensity={1.0} color="#ec4899" />
      <pointLight position={[0, 0, -6]} intensity={0.8} color="#22d3ee" />

      <CoreMesh />
      <OuterRing />

      {nodeData.map((n, i) => (
        <CodeNode key={i} position={n.pos} color={n.color} scale={n.scale} />
      ))}

      {connections.map(([a, b], i) => (
        <ConnectionLine
          key={i}
          start={nodeData[a].pos}
          end={nodeData[b].pos}
          color={nodeData[a].color}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
};

const HeroScene = () => (
  <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
    <SWEScene />
  </Canvas>
);

export default HeroScene;
