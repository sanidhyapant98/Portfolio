import React from 'react';

interface PageFooterProps {
  pageNumber: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageFooter({ pageNumber, className = "", children }: PageFooterProps) {
  return (
    <div className={`w-full mt-auto pt-24 pb-8 flex flex-col gap-6 ${className}`}>
      <div className="hero-separator w-full h-px bg-white/20" />
      
      <div className="flex justify-between items-end text-gray-500 font-mono uppercase text-[10px] sm:text-xs tracking-[0.2em]">
        <div className="hero-bottom-text">
          P. {pageNumber}
        </div>
        {children}
      </div>
    </div>
  );
}
