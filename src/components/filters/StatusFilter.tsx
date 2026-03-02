'use client';

import Dropdown from '@/components/ui/Dropdown';
import { STATUS_OPTIONS } from '@/lib/constants';
import type { OverallStatus } from '@/types/study';

interface StatusFilterProps {
  value: OverallStatus[];
  onChange: (value: OverallStatus[]) => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  const handleToggle = (status: OverallStatus) => {
    if (value.includes(status)) {
      onChange(value.filter((s) => s !== status));
    } else {
      onChange([...value, status]);
    }
  };

  return (
    <Dropdown label="Status" isActive={value.length > 0}>
      <div className="space-y-1">
        {STATUS_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#F5F5F0] cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#0D9488] focus:ring-[#0D9488]/20 cursor-pointer accent-[#0D9488]"
            />
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: option.color }}
            />
            <span className="text-sm text-[#374151]">{option.label}</span>
          </label>
        ))}
      </div>
    </Dropdown>
  );
}
