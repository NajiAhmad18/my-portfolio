import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

// ── Perfectly Rounded Fibonacci Sphere ─────────────────
const DottedSphere = ({ color }) => {
  const pointsRef = useRef();
  const particlesCount = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for(let i = 0; i < particlesCount; i++) {
      const y = 1 - (i / (particlesCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i;

      const r = 2.8; // Set sphere radius
      pos[i * 3]     = r * Math.cos(theta) * radiusAtY;
      pos[i * 3 + 1] = r * y;
      pos[i * 3 + 2] = r * Math.sin(theta) * radiusAtY;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

// ── Floating Tech Elements (Servers, Databases, Chips) ─
const FloatingTechElements = ({ color }) => {
  return (
    <>
      {/* A floating server/data block (Wireframe Cube) */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5} position={[-2.8, 1.8, -1]}>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
      </Float>
      
      {/* A floating database (Wireframe Cylinder) */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1} position={[2.8, -0.8, 1]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.7, 12]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
      </Float>

      {/* A floating microchip / node (Flat Box) */}
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5} position={[2.2, 2.2, -2]}>
        <mesh>
          <boxGeometry args={[0.5, 0.08, 0.6]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
      </Float>
      
      {/* A floating data packet / node (Wireframe Sphere) */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={0.8} position={[-2.4, -1.5, 2]}>
        <mesh>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
      </Float>
    </>
  );
};

// ── Scene ───────────────────────────────────────────────
const SWEScene = () => {
  const { activeTheme } = useTheme();
  const accentColor = activeTheme === 'light' ? '#0F766E' : '#14B8A6';

  return (
    <>
      <ambientLight intensity={1} />
      <DottedSphere color={accentColor} />
      <FloatingTechElements color={accentColor} />
    </>
  );
};

// ── Canvas — transparent so site bg shows through ──────
const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0, 9], fov: 50 }}
    style={{ background: 'transparent' }}
    gl={{ alpha: true, antialias: false }}
  >
    <SWEScene />
  </Canvas>
);

export default HeroScene;
