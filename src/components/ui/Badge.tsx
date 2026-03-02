'use client';

interface BadgeProps {
  label: string;
  color?: string;
  variant?: 'solid' | 'outline';
}

export default function Badge({ label, color = '#64748b', variant = 'outline' }: BadgeProps) {
  const baseClasses =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors';

  if (variant === 'solid') {
    return (
      <span
        className={baseClasses}
        style={{
          backgroundColor: color,
          color: '#ffffff',
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={baseClasses}
      style={{
        backgroundColor: `${color}14`,
        color: color,
        border: `1px solid ${color}33`,
      }}
    >
      {label}
    </span>
  );
}
