import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageFooter from './PageFooter';

gsap.registerPlugin(ScrollTrigger);

const codeData = [
  { label: 'LANGS', value: 'TypeScript · JavaScript · Java' },
  { label: 'FRONT', value: 'React · Next.js' },
  { label: 'BACK', value: 'Node.js · Express' },
  { label: 'DATA', value: 'MongoDB · PostgreSQL · Redis' },
  { label: 'TOOLS', value: 'Figma · Postman · Git-Github' },
  { label: 'DEPLOY', value: 'Vercel · GCP · Docker' },
];

const cultureData = [
  { label: 'SOUND', value: 'One Direction · Morgan Wallen · Post Malone' },
  { label: 'Hobbies', value: 'Football · Music · Books' },
  { label: 'READ', value: 'Jeff Kinney · Enid Blyton' },
  { label: 'WEAR', value: 'Vintage' },
  { label: 'CITY', value: 'Madrid' },
  { label: 'NOW', value: 'Building in public. Slowly.' },
];

export default function WhoAmI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray('.who-heading') as HTMLElement[];

      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Increased for smoother scroll
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Reveal rows progressively as the line moves (both columns in sync)
      const leftRows = gsap.utils.toArray('.left-column .reveal-row') as HTMLElement[];
      const rightRows = gsap.utils.toArray('.right-column .reveal-row') as HTMLElement[];
      
      const maxRows = Math.max(leftRows.length, rightRows.length);

      const rowStep = 0.9;
      const rowStart = 0.85;
      const totalDuration = rowStart + (maxRows * rowStep) + 0.6;

      gsap.set(headings, { opacity: 0, y: 40 });
      gsap.set([...leftRows, ...rightRows], { opacity: 0, x: 0 });

      // Animate the line and circle across the full scroll duration
      tl.to(lineRef.current, { height: "100%", duration: totalDuration, ease: "none" }, 0);
      tl.to(circleRef.current, { top: "100%", duration: totalDuration, ease: "none" }, 0);

      // Headings reveal together
      tl.to(headings, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0,
      }, 0.1);

      for (let i = 0; i < maxRows; i++) {
        const timePos = rowStart + (i * rowStep);
        
        if (leftRows[i]) {
          tl.fromTo(leftRows[i] as HTMLElement, 
            { opacity: 0, x: -30 }, 
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 
            timePos
          );
        }
        
        if (rightRows[i]) {
          tl.fromTo(rightRows[i] as HTMLElement, 
            { opacity: 0, x: 30 }, 
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 
            timePos
          );
        }
      }

      // Final pause at the end
      tl.to({}, { duration: 0.2 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="who-am-i" 
      ref={containerRef} 
      className="relative bg-black min-h-screen flex flex-col overflow-hidden"
    >
      {/* Top Tag */}
      <div className=" top-8 left-8 md:top-12 md:left-12 z-20">
        <span className="text-[10px] font-mono tracking-[0.3em] text-accent-red">
          / WHO AM I / P. 003
        </span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block">
          <div 
            ref={lineRef} 
            className="absolute top-0 left-0 w-full bg-accent-red h-0 shadow-[0_0_15px_rgba(255,77,0,0.5)]"
          />
          <div 
            ref={circleRef} 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center z-10"
          >
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Left Column: The Code */}
        <div className="left-column flex-1 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-28 md:py-0 bg-black">
          <div className="max-w-2xl w-full">
            <span className="who-heading text-[10px] font-mono tracking-[0.3em] text-accent-red mb-8 block">
              THE CODE
            </span>
            <h2 className="who-heading text-6xl md:text-7xl lg:text-9xl font-heading uppercase leading-[0.85] mb-16 md:mb-20 text-offwhite">
              What<br />I Build
            </h2>
            
            <div className="space-y-0">
              {codeData.map((item, i) => (
                <div key={i} className="flex items-center border-t border-white/5 py-6 reveal-row group cursor-none">
                  <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-accent-red w-20 sm:w-28 shrink-0 transition-all duration-300 group-hover:pl-2">
                    {item.label}
                  </span>
                  <span className="text-sm md:text-base lg:text-lg font-medium text-white/50 group-hover:text-white transition-colors duration-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: The Culture */}
        <div className="right-column flex-1 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-28 md:py-0 bg-black">
          <div className="max-w-2xl w-full ml-auto">
            <span className="who-heading text-[10px] font-mono tracking-[0.3em] text-accent-red mb-8 block md:text-center">
              THE CULTURE
            </span>
            <h2 className="who-heading text-6xl md:text-7xl lg:text-9xl font-heading uppercase leading-[0.85] mb-16 md:mb-20 text-offwhite md:text-center">
              What<br />Moves Me
            </h2>
            
            <div className="space-y-0">
              {cultureData.map((item, i) => (
                <div key={i} className="flex items-center border-t border-white/5 py-6 reveal-row group cursor-none">
                  <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-accent-red w-20 sm:w-28 shrink-0 transition-all duration-300 group-hover:pl-2">
                    {item.label}
                  </span>
                  <span className="text-sm md:text-base lg:text-lg font-medium text-white/50 group-hover:text-white transition-colors duration-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-base w-full pb-8 z-20">
        <PageFooter pageNumber="003" />
      </div>
    </section>
  );
}
