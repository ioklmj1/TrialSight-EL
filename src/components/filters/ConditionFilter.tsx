'use client';

import Dropdown from '@/components/ui/Dropdown';
import { THERAPEUTIC_AREAS } from '@/lib/constants';

interface ConditionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ConditionFilter({ value, onChange }: ConditionFilterProps) {
  return (
    <Dropdown label="Condition" isActive={value !== ''}>
      <div className="space-y-3">
        {/* Text input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a condition..."
          className="w-full px-3 py-2 rounded-lg bg-[#F5F5F0] border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
        />

        {/* Quick-select chips */}
        <div>
          <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-2">
            Therapeutic Areas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {THERAPEUTIC_AREAS.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => onChange(area)}
                className={`
                  px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer
                  ${
                    value === area
                      ? 'bg-[#0D9488] text-white'
                      : 'bg-[#F5F5F0] text-[#475569] hover:bg-[#E8E5DE] border border-[#E8E5DE]'
                  }
                `}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Dropdown>
  );
}
