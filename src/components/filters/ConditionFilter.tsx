'use client';

import Dropdown from '@/components/ui/Dropdown';
import { THERAPEUTIC_AREAS } from '@/lib/constants';

interface ConditionFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function ConditionFilter({ value, onChange }: ConditionFilterProps) {
  const handleToggle = (area: string) => {
    if (value.includes(area)) {
      onChange(value.filter((a) => a !== area));
    } else {
      onChange([...value, area]);
    }
  };

  return (
    <Dropdown label="Disease Area" isActive={value.length > 0}>
      <div className="space-y-1 max-h-[320px] overflow-y-auto">
        {THERAPEUTIC_AREAS.map((area) => (
          <label
            key={area}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#F5F5F0] cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={value.includes(area)}
              onChange={() => handleToggle(area)}
              className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#0D9488] focus:ring-[#0D9488]/20 cursor-pointer accent-[#0D9488]"
            />
            <span className="text-sm text-[#374151]">{area}</span>
          </label>
        ))}
      </div>
    </Dropdown>
  );
}
