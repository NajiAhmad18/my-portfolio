import React, { Suspense } from 'react';

const Hero = React.lazy(() => import('../Hero/Hero'));
const About = React.lazy(() => import('../About/About'));
const Skills = React.lazy(() => import('../Skills/Skills'));
const Projects = React.lazy(() => import('../Projects/Projects'));
const Articles = React.lazy(() => import('../Articles/Articles'));
const CodingProfiles = React.lazy(() => import('../CodingProfiles/CodingProfiles'));
const CTA = React.lazy(() => import('../CTA/CTA'));
const Contact = React.lazy(() => import('../Contact/Contact'));

const Home = () => {
  return (
    <Suspense fallback={null}>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Articles />
      <CodingProfiles />
      <CTA />
      <Contact />
    </Suspense>
  );
};

export default Home;
