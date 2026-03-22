import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageFooter from './PageFooter';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'MyRes - RMS',
    description: 'A Restaurant Management System Backend built for CRUD operations with RBAC and Rate Limiting',
    tech: ['ExpressJS', 'NodeJS', 'MongoDB', 'Redis'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426'
  },
  {
    id: 2,
    title: 'Match Mingle',
    description: 'A full-stack webapp for dating and making connections with chats feature',
    tech: ['ExpressJS', 'MongoDB', 'ReactJS', 'Socket.IO'],
    image: 'data:image/jpeg;base64,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'
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
      
      cards.forEach((card) => {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        const text = card.querySelector('.project-overlay-text');

        const tl = gsap.timeline({ paused: true });
        
        tl.to(card, { scale: 1.02, duration: 0.4, ease: "power2.out" })
          .to(image, { scale: 1.1, filter: "grayscale(0%)", duration: 0.6, ease: "power2.out" }, 0)
          .to(overlay, { opacity: 1, duration: 0.4 }, 0)
          .fromTo(text, { y: 20 }, { y: 0, duration: 0.4, ease: "power2.out" }, 0.1);

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="section-pad bg-black border-t border-white/5 py-32 md:py-48 flex flex-col">
      <div className="container-base flex-1">
        <div className="mb-16 md:mb-24">
          <h2 className="reveal-on-scroll text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Selected Work
          </h2>
          <h3 className="reveal-on-scroll text-4xl md:text-5xl font-bold tracking-tight">
            Projects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative flex flex-col reveal-on-scroll"
            >
              <div className="relative aspect-16/10 overflow-hidden mb-8 border border-white/10 bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image w-full h-full object-cover filter grayscale transition-all duration-700"
                />
                
              </div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-accent-red transition-colors duration-300">
                    {project.title}
                  </h4>
                  <div className="text-gray-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <p className="text-muted mb-8 max-w-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono uppercase tracking-widest text-gray-400 px-3 py-1 border border-white/10 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Invisible link covering the whole card area */}
              <a href="#" className="absolute inset-0 z-10" aria-label={`View ${project.title}`}></a>
            </div>
          ))}
        </div>
      </div>
      <div className="container-base w-full">
        <PageFooter pageNumber="004" />
      </div>
    </section>
  );
}
