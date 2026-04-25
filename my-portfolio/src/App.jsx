import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useSettings } from './hooks/useSettings';

const Navbar = React.lazy(() => import('./components/Navbar/Navbar'));
const Home = React.lazy(() => import('./components/Home/Home'));
const About = React.lazy(() => import('./components/About/About'));
const Skills = React.lazy(() => import('./components/Skills/Skills'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Articles = React.lazy(() => import('./components/Articles/Articles'));
const CodingProfiles = React.lazy(() => import('./components/CodingProfiles/CodingProfiles'));
const CTA = React.lazy(() => import('./components/CTA/CTA'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const PageTransition = React.lazy(() => import('./components/PageTransition'));
const ScrollToTop = React.lazy(() => import('./components/ScrollToTop'));
const HeroScene = React.lazy(() => import('./components/Hero/HeroScene'));
const ParticlesBg = React.lazy(() => import('./components/Hero/ParticlesBg'));
const LiquidBlobs = React.lazy(() => import('./components/LiquidBlobs/LiquidBlobs'));

// Check WebGL support before rendering 3D
const checkWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// Error boundary to catch WebGL crashes silently
class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const GlobalBackground = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 1200, 3000], [0.85, 0.5, 0.25]);
  const webGLSupported = React.useMemo(() => checkWebGL(), []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
      }}
    >
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <ParticlesBg />
          {webGLSupported && <HeroScene />}
        </Suspense>
      </SceneErrorBoundary>
    </motion.div>
  );
};

function App() {
  const location = useLocation();
  const settings = useSettings();

  React.useEffect(() => {
    if (settings.siteTitle) {
      document.title = `${settings.siteTitle} | Portfolio`;
    }
  }, [settings.siteTitle]);

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {/* Liquid blob ambient background */}
      <Suspense fallback={null}><LiquidBlobs /></Suspense>
      {/* Fixed 3D background that fades as you scroll */}
      <GlobalBackground />

      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', color: '#fff' }}>Loading...</div>}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollToTop />
          <Navbar />
          <main style={{ paddingTop: '80px' }}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Home: all sections stacked, scroll through everything */}
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />

                {/* Individual section pages opened via navbar */}
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/articles" element={<PageTransition><><Articles /><CodingProfiles /></></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default App;

