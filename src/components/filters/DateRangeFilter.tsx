'use client';

import Dropdown from '@/components/ui/Dropdown';

interface DateRangeFilterProps {
  fromValue: string;
  toValue: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
}

export default function DateRangeFilter({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}: DateRangeFilterProps) {
  const isActive = fromValue !== '' || toValue !== '';

  return (
    <Dropdown label="Date Range" isActive={isActive}>
      <div className="space-y-3">
        <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
          Study Start Year
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-xs text-[#64748B] mb-1">From</label>
            <input
              type="text"
              inputMode="numeric"
              value={fromValue}
              onChange={(e) => onFromChange(e.target.value)}
              placeholder="2010"
              maxLength={4}
              className="w-full px-3 py-2 rounded-lg bg-[#F5F5F0] border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            />
          </div>
          <span className="text-[#94A3B8] mt-5">&ndash;</span>
          <div className="flex-1">
            <label className="block text-xs text-[#64748B] mb-1">To</label>
            <input
              type="text"
              inputMode="numeric"
              value={toValue}
              onChange={(e) => onToChange(e.target.value)}
              placeholder="2025"
              maxLength={4}
              className="w-full px-3 py-2 rounded-lg bg-[#F5F5F0] border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            />
          </div>
        </div>
      </div>
    </Dropdown>
  );
}
