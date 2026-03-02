interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#E8E5DE]/50 flex items-center justify-center mb-5">
        <svg
          className="w-8 h-8 text-[#94A3B8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-[#1E293B] mb-1.5">{title}</h3>
      <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">{description}</p>
    </div>
  );
}
