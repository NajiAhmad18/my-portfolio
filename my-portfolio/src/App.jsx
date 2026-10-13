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
const GlobalBackground = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800, 2400], [1, 0.6, 0.2]);

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
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 20%, var(--accent-glow), transparent 24rem)' }} />
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

