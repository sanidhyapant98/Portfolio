import Hero from './components/Hero';
import About from './components/About';
import WhoAmI from './components/WhoAmI';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';


import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Global Reveal Animation for sections and specific elements
      const revealElements = gsap.utils.toArray('.reveal-on-scroll') as HTMLElement[];
      
      revealElements.forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-sans cursor-none">
      <ScrollProgressBar />
      <CustomCursor />
      
      <main>
        <Hero />
        <About />
        <WhoAmI />
        <Projects />
        <Certifications />
        <Contact />
        <footer className="py-16 text-center text-gray-600 text-sm reveal-on-scroll">
        <p className="tracking-widest uppercase font-mono">© {new Date().getFullYear()} SANIDHYA PANT. All rights reserved.</p>
        </footer>
      </main>
      
    </div>
  );
}
