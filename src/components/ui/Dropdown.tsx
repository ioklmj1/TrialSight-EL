'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';

interface DropdownProps {
  label: string;
  isActive: boolean;
  children: ReactNode;
}

export default function Dropdown({ label, isActive, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
          border transition-all duration-150 cursor-pointer
          ${
            isActive
              ? 'border-[#0D9488] bg-[#0D9488]/5 text-[#0D9488]'
              : 'border-[#E8E5DE] bg-white text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
          }
          ${isOpen ? 'ring-2 ring-[#0D9488]/20' : ''}
        `}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[240px] bg-white border border-[#E8E5DE] rounded-xl shadow-lg shadow-black/5 p-3 animate-in fade-in slide-in-from-top-1 duration-150">
          {children}
        </div>
      )}
    </div>
  );
}
