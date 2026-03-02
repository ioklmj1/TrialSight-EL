'use client';

import Dropdown from '@/components/ui/Dropdown';

interface SponsorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SponsorFilter({ value, onChange }: SponsorFilterProps) {
  return (
    <Dropdown label="Sponsor" isActive={value !== ''}>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Sponsor name..."
          className="w-full px-3 py-2 rounded-lg bg-[#F5F5F0] border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
        />
      </div>
    </Dropdown>
  );
}
