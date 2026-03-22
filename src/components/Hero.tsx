import { useState, useLayoutEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageFooter from './PageFooter';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Transform scroll position to movement
  const sanidhyaY = useTransform(scrollY, [0, 600], [0, -450]);
  const sanidhyaX = useTransform(scrollY, [0, 600], [0, -150]);
  const sanidhyaScale = useTransform(scrollY, [0, 600], [1, 0.35]);
  const pantX = useTransform(scrollY, [0, 600], [0, 800]);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 }
      });

      tl.from(".hero-name-span", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
      })
      .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
      }, "-=0.8")
      .from(".hero-btn", {
        y: 20,
        opacity: 0,
      }, "-=0.6")
      .from(".hero-separator", {
        scaleX: 0,
        transformOrigin: "left",
      }, "-=0.8")
      .from(".hero-bottom-text", {
        opacity: 0,
        y: 10,
        stagger: 0.1,
      }, "-=0.5");

      // Parallax Animations
      gsap.to(".bg-parallax-1", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
      gsap.to(".bg-parallax-2", {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    
    return () => ctx.revert();
  }, []);

  const [hovered, setHovered] = useState<'none' | 'sanidhya' | 'pant'>('none');

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between pt-6 px-6 pb-2 md:pt-12 md:px-12 md:pb-6 font-mono uppercase text-xs tracking-[0.2em] selection:bg-accent-red selection:text-white"
    >
      
      {/* Background Parallax Elements (GSAP) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div 
          className="bg-parallax-1 absolute top-[20%] right-[-5%] text-white/3 text-[25vw] font-heading leading-none whitespace-nowrap"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
        </div>
        <div 
          className="bg-parallax-2 absolute bottom-[15%] left-[-5%] text-white/3 text-[20vw] font-heading leading-none whitespace-nowrap"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
        </div>
        
        {/* Subtle decorative lines */}
        <div className="bg-parallax-1 absolute top-1/4 left-[15%] w-px h-[40vh] bg-white/5 opacity-50" style={{ transform: 'translate3d(0, 0, 0)' }} />
        <div className="bg-parallax-2 absolute bottom-1/4 right-[20%] w-px h-[30vh] bg-white/5 opacity-50" style={{ transform: 'translate3d(0, 0, 0)' }} />
      </div>

      {/* Top Section */}
      <div className="flex justify-between items-start z-10 text-gray-500 uppercase tracking-widest text-[10px] sm:text-xs">
        <div className="hero-bottom-text opacity-1">
          sanidhyapant.com
        </div>
      </div>

      {/* Main Name Section */}
      <div className="flex-1 flex flex-col justify-center translate-y-4 md:translate-y-8 mb-12">
        <div className="flex flex-col items-start translate-x-[-1%]">
          <h1 className="font-heading text-[12vw] sm:text-[14vw] md:text-[16vw] lg:text-[18vw] leading-[0.8] -ml-1 md:-ml-2 flex flex-col uppercase">
            <motion.span 
              onMouseEnter={() => setHovered('sanidhya')}
              onMouseLeave={() => setHovered('none')}
              style={{ y: sanidhyaY, x: sanidhyaX, scale: sanidhyaScale, originX: 0, originY: 0 }}
              className={`hero-name-span tracking-[-0.05em] transition-colors duration-500 cursor-default ${
                hovered === 'sanidhya' ? 'text-accent-red' : 'text-offwhite'
              }`}
            >
              SANIDHYA
            </motion.span>
            <motion.span 
              onMouseEnter={() => setHovered('pant')}
              onMouseLeave={() => setHovered('none')}
              style={{ x: pantX }}
              className={`hero-name-span tracking-[-0.05em] transition-colors duration-500 cursor-default ${
                hovered === 'pant' ? 'text-accent-red' : 'text-offwhite'
              }`}
            >
              PANT
            </motion.span>
          </h1>



          <div className="hero-btn mt-8 md:mt-16">
            <a
              href="/updatedGCV.pdf"
              download="Sanidhya_Pant_CV.pdf"
              className="btn-water-fill px-8 py-4 rounded-full text-white font-medium tracking-widest text-[10px] sm:text-xs"
            >
              <span>Get CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="z-10 w-full mb-4">
        <PageFooter pageNumber="001" className="pt-4 pb-0 gap-4">
          <div className="hero-bottom-text flex flex-col items-end gap-1 text-right">
            <div className="text-[10px] sm:text-xs">/ CREATIVE DEVELOPER</div>
            <div className="text-white flex items-center gap-2 text-[10px] sm:text-xs">
              <span className="animate-bounce">↓</span> SCROLL TO TUNE IN
            </div>
          </div>
        </PageFooter>
      </div>
    </section>
  );
}