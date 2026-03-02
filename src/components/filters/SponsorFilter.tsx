'use client';

import { useState, useMemo } from 'react';
import Dropdown from '@/components/ui/Dropdown';

const SPONSOR_SUGGESTIONS = [
  'Pfizer', 'Novartis', 'Roche', 'Merck', 'Johnson & Johnson',
  'AstraZeneca', 'Sanofi', 'AbbVie', 'Bristol-Myers Squibb', 'Eli Lilly',
  'Amgen', 'Gilead Sciences', 'Bayer', 'Novo Nordisk', 'GSK',
  'Takeda', 'Boehringer Ingelheim', 'Regeneron', 'Moderna', 'BioNTech',
  'Vertex Pharmaceuticals', 'Biogen', 'Daiichi Sankyo', 'Astellas',
  'Eisai', 'UCB', 'Incyte', 'Jazz Pharmaceuticals', 'Seagen',
  'National Cancer Institute', 'National Institutes of Health',
];

interface SponsorFilterProps {
  value: string;
  onChange: (value: string) => void;
  onCommit: () => void;
}

export default function SponsorFilter({ value, onChange, onCommit }: SponsorFilterProps) {
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    if (!value || value.length < 2) return [];
    const lower = value.toLowerCase();
    return SPONSOR_SUGGESTIONS.filter(s => s.toLowerCase().includes(lower)).slice(0, 8);
  }, [value]);

  const showSuggestions = isFocused && suggestions.length > 0;

  return (
    <Dropdown label="Sponsor" isActive={value !== ''}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onCommit();
            }
          }}
          placeholder="Sponsor name..."
          className="w-full px-3 py-2 rounded-lg bg-[#F5F5F0] border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
        />
        {showSuggestions && (
          <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E8E5DE] rounded-lg shadow-lg overflow-hidden z-10">
            {suggestions.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(name);
                    setIsFocused(false);
                    onCommit();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#1E293B] hover:bg-[#F5F5F0] transition-colors cursor-pointer"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Dropdown>
  );
}
