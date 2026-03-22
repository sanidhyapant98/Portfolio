import PageFooter from './PageFooter';

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-black border-t border-white/5 py-32 md:py-48 relative overflow-hidden flex flex-col min-h-screen">
      <div
        className="container-base flex flex-col items-center justify-center text-center reveal-on-scroll flex-1"
      >
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
          Get in Touch
        </h2>
        
        <h3 className="heading-lg mb-8">
          Let's build something <br className="hidden md:block" /> incredible together.
        </h3>
        
        <p className="text-muted max-w-xl mx-auto mb-16 md:mb-20">
          Whether you have a specific project in mind, want to explore a potential collaboration, or simply want to say hello, my inbox is always open.
        </p>

        <a
          href="mailto:sanidhyapant98@gmail.com"
          className="btn-water-fill px-8 py-4 rounded-full text-white font-medium tracking-widest text-[10px] sm:text-xs cursor-none"
        >
          <span>sanidhyapant98@gmail.com</span>
        </a>

        <div className="mt-24 md:mt-32 flex gap-8">
          {[
            { name: 'GitHub', url: 'https://github.com/sanidhyapant98' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/sanidhyapant98' },
            { name: 'X', url: 'https://x.com/sanidhyapant98' }
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white uppercase text-sm tracking-wider transition-colors duration-300 relative group"
            >
              {social.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
      <div className="container-base w-full">
        <PageFooter pageNumber="005" />
      </div>
    </section>
  );
}