import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-10 h-10", className)}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="url(#logo-gradient)" />
      
      {/* Neural Paths */}
      <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Top Right */}
        <path d="M58 42L78 22" />
        <path d="M58 42L58 32" />
        <path d="M58 42L68 42" />
        
        {/* Top Left */}
        <path d="M42 42L22 22" />
        <path d="M42 42L42 32" />
        <path d="M42 42L32 42" />
        
        {/* Bottom Left */}
        <path d="M42 58L22 78" />
        <path d="M42 58L42 68" />
        <path d="M42 58L32 58" />
        
        {/* Bottom Right */}
        <path d="M58 58L78 78" />
        <path d="M58 58L58 68" />
        <path d="M58 58L68 58" />
      </g>
      
      {/* Center Gap */}
      <rect x="46" y="46" width="8" height="8" rx="1" fill="white" fillOpacity="0.1" />
    </svg>
  );
}
