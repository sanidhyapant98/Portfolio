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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
    link: 'https://github.com/sanidhyapant98/MyRes'
  },
  {
    id: 2,
    title: 'Match Mingle',
    description: 'A full-stack webapp for dating and making connections with chats feature',
    tech: ['ExpressJS', 'MongoDB', 'ReactJS', 'Socket.IO'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2426',
    link: 'https://github.com/sanidhyapant98/MatchMingle'
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
    <section id="projects" ref={containerRef} className="section-pad bg-black py-32 md:py-48 flex flex-col">
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
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute inset-0 z-10" 
                aria-label={`View ${project.title}`}
              ></a>
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
