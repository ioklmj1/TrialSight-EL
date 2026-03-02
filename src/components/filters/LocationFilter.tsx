'use client';

import Dropdown from '@/components/ui/Dropdown';

interface LocationFilterProps {
  country: string;
  city: string;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onCommit: () => void;
}

export default function LocationFilter({ country, city, onCountryChange, onCityChange, onCommit }: LocationFilterProps) {
  const isActive = country !== '' || city !== '';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onCommit();
    }
  };

  return (
    <Dropdown label="Location" isActive={isActive}>
      <div className="space-y-2">
        <div>
          <label className="block text-xs font-medium text-[#64748B] mb-1">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. United States"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F5F0] border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#64748B] mb-1">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Boston"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F5F0] border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
          />
        </div>
      </div>
    </Dropdown>
  );
}
