import type { SVGProps } from "react";

export function CrownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M2 18 L2 6 L7 12 L12 6 L17 12 L22 6 L22 18 Z" />
      <path d="M2 18 L22 18" strokeWidth="3" />
    </svg>
  );
}

export function SkullIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M6 14 A8 8 0 1 1 18 14 C18 18 15 21 12 21 C9 21 6 18 6 14 Z" />
      <path d="M12 15 V17" />
      <path d="M10 10 A1.5 1.5 0 1 1 10 7 L10 10 Z" fill="currentColor" />
      <path d="M14 10 A1.5 1.5 0 1 0 14 7 L14 10 Z" fill="currentColor" />
      <path d="M9 21 L9 23" />
      <path d="M15 21 L15 23" />
    </svg>
  );
}
