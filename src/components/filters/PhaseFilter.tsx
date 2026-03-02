'use client';

import Dropdown from '@/components/ui/Dropdown';
import { PHASE_OPTIONS } from '@/lib/constants';
import type { Phase } from '@/types/study';

interface PhaseFilterProps {
  value: Phase[];
  onChange: (value: Phase[]) => void;
}

export default function PhaseFilter({ value, onChange }: PhaseFilterProps) {
  const handleToggle = (phase: Phase) => {
    if (value.includes(phase)) {
      onChange(value.filter((p) => p !== phase));
    } else {
      onChange([...value, phase]);
    }
  };

  return (
    <Dropdown label="Phase" isActive={value.length > 0}>
      <div className="space-y-1">
        {PHASE_OPTIONS.map((option) => (
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
            <span className="text-sm text-[#374151]">{option.label}</span>
          </label>
        ))}
      </div>
    </Dropdown>
  );
}
