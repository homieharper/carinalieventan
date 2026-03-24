'use client';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowButtonGoldProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'white';
}

export function FlowButtonGold({ text = "Button", href, onClick, variant = 'default' }: FlowButtonGoldProps) {
  const isWhite = variant === 'white';
  
  const className = cn(
    "group relative flex items-center gap-2 overflow-hidden rounded-full border-2 px-6 py-3.5 text-sm font-semibold cursor-pointer transition-all duration-700 ease-out active:scale-95 border-gold bg-transparent transition-colors",
    isWhite ? "text-white" : "text-gold",
    "hover:text-white"
  );

  const arrowClass = cn(
    "absolute w-4 h-4 fill-none z-20 transition-all duration-700 ease-out",
    isWhite ? "text-white" : "text-gold",
    "group-hover:text-white"
  );
  
  const content = (
    <>
      <ArrowRight 
        className={cn(arrowClass, "left-[-25%] group-hover:left-4")} 
      />
      <span className="relative z-10 -translate-x-3 group-hover:translate-x-3 transition-all duration-700 ease-out uppercase tracking-widest text-xs">
        {text}
      </span>
      {/* Expanding gold background circle */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-gold opacity-0 group-hover:w-[400px] group-hover:h-[400px] group-hover:opacity-100 transition-all duration-700 ease-out z-0"></span>
      <ArrowRight 
        className={cn(arrowClass, "right-4 group-hover:right-[-25%]")} 
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}
