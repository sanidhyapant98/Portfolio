import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, ShieldCheck, Globe, Network, Cpu, Layout } from 'lucide-react';
import PageFooter from './PageFooter';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: 'Java Programming with DSA',
    issuer: 'Cipher Schools',
    link: 'https://www.cipherschools.com/certificate/preview?id=689ec7fbb0ddec34f906ebb2',
    icon: Cpu,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 2,
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Coursera - Google',
    link: 'https://coursera.org/share/30759672f308cc09fac5eb6848226d21',
    icon: Globe,
    color: 'from-red-500/20 to-orange-500/20'
  },
  {
    id: 3,
    title: 'Packet Switching Networks and Algorithms',
    issuer: 'Coursera - University Of Colorado',
    link: 'https://coursera.org/share/72f162e7f57f1c4da7ba50699659c62d',
    icon: Network,
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 4,
    title: 'TCP/IP and Advanced Topics',
    issuer: 'Coursera - University Of Colorado',
    link: 'https://coursera.org/share/159f809c97f9363cfec2c6aaf62dfcc3',
    icon: ShieldCheck,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 5,
    title: 'Responsive Web Design',
    issuer: 'Free Code Camp',
    link: 'https://www.freecodecamp.org/certification/fcc8e9c7d2d-eab6-4000-9ae6-6b51c72b2e3b/responsive-web-design',
    icon: Layout,
    color: 'from-yellow-500/20 to-amber-500/20'
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.cert-item') as HTMLElement[];
      
      items.forEach((item) => {
        const bg = item.querySelector('.cert-bg');
        const icon = item.querySelector('.cert-icon');
        const arrow = item.querySelector('.cert-arrow');

        const tl = gsap.timeline({ paused: true });
        
        tl.to(bg, { opacity: 1, duration: 0.4, ease: "power2.out" })
          .to(icon, { scale: 1.1, color: '#f3f4f6', duration: 0.4 }, 0)
          .to(arrow, { x: 5, opacity: 1, duration: 0.4 }, 0);

        item.addEventListener('mouseenter', () => tl.play());
        item.addEventListener('mouseleave', () => tl.reverse());
      });

      // Special animation for the section title
      gsap.from('.cert-title', {
        scrollTrigger: {
          trigger: '.cert-title',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={containerRef} className="section-pad bg-black py-32 md:py-48">
      <div className="container-base">
        <div className="mb-16 md:mb-24">
          <h2 className="reveal-on-scroll text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Recognition
          </h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h3 className="reveal-on-scroll text-4xl md:text-5xl font-bold tracking-tight">
              Certifications
            </h3>
            <p className="reveal-on-scroll text-muted max-w-md text-lg">
              Validating expertise through industry-recognized programs and continuous learning.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-item group relative flex items-center justify-between p-6 md:p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-white/10 transition-all duration-300 reveal-on-scroll overflow-hidden"
            >
              {/* Hover Background Gradient */}
              <div className={`cert-bg absolute inset-0 bg-linear-to-r ${cert.color} opacity-0 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex items-center gap-6 md:gap-8">
                <div className="cert-icon p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 group-hover:bg-white/10 transition-all duration-300">
                  <cert.icon size={28} />
                </div>
                
                <div>
                  <h4 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-200 group-hover:text-white transition-colors duration-300">
                    {cert.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-500 font-medium">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="cert-arrow opacity-0 -translate-x-2 transition-all duration-300 text-gray-400">
                  <ExternalLink size={20} />
                </div>
                <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 group-hover:border-white/20 transition-colors">
                  <Award className="text-gray-500 group-hover:text-accent-red" size={18} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      <div className="container-base mt-32">
        <PageFooter pageNumber="005" />
      </div>
    </section>
  );
}