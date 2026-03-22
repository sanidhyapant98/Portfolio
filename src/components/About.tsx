import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import PageFooter from './PageFooter';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.reveal-line') as HTMLElement[];
      
      // Create a single timeline for the pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // This controls the "length" of the scroll area
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Reveal lines one by one
      lines.forEach((line) => {
        tl.to(line, {
          backgroundPosition: "0% 0%",
          ease: "none",
        });
      });
      
      // Keep everything at 100% reveal once finished
      tl.to({}, { duration: 0.1 });
    });

    return () => ctx.revert();
  }, []);

  const content = [
    "I am a software engineer focused on",
    "crafting digital experiences that perform",
    "flawlessly and leave lasting impressions."
  ];

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative bg-black min-h-screen flex flex-col justify-center border-t border-white/5 overflow-hidden"
    >
      <div className="container-base section-pad w-full flex-1 flex flex-col justify-center">
        <div className="max-w-7xl">
          <h2 className="reveal-on-scroll text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-16 md:mb-24">
            About Me
          </h2>
          
          <div className="relative">
            <h3 ref={textRef} className="heading-lg leading-[1.3] md:leading-[1.2] lg:leading-[1.15] flex flex-col items-start">
              {content.map((line, i) => (
                <span 
                  key={i} 
                  className="reveal-line block whitespace-pre-wrap py-2"
                  style={{ 
                    backgroundImage: "linear-gradient(to right, white 50%, rgba(255,255,255,0.1) 50%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "100% 0%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {line}
                </span>
              ))}
            </h3>
          </div>
        </div>
      </div>
      <div className="container-base w-full">
        <PageFooter pageNumber="002" />
      </div>
    </section>
  );
}