import React, { Suspense } from 'react';

// Using lazy loading for components to improve initial load performance
const Navbar = React.lazy(() => import('./components/Navbar/Navbar'));
const Hero = React.lazy(() => import('./components/Hero/Hero'));
const About = React.lazy(() => import('./components/About/About'));
const Skills = React.lazy(() => import('./components/Skills/Skills'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Articles = React.lazy(() => import('./components/Articles/Articles'));
const CodingProfiles = React.lazy(() => import('./components/CodingProfiles/CodingProfiles'));
const CTA = React.lazy(() => import('./components/CTA/CTA'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', color: '#fff' }}>Loading...</div>}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Articles />
          <CodingProfiles />
          <CTA />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
