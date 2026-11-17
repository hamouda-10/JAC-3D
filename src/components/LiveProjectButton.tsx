import React from 'react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
}

export function LiveProjectButton({ onClick, className = '' }: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] ${className}`}
    >
      Live Project
    </button>
  );
}
