'use client';

interface ViewToggleProps {
  view: 'list' | 'map';
  onChange: (view: 'list' | 'map') => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-white border border-[#E8E5DE] rounded-lg p-0.5">
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`
          inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer
          ${view === 'list'
            ? 'bg-[#1E293B] text-white shadow-sm'
            : 'text-[#64748B] hover:text-[#1E293B]'
          }
        `}
      >
        {/* List icon */}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        List
      </button>
      <button
        type="button"
        onClick={() => onChange('map')}
        className={`
          inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer
          ${view === 'map'
            ? 'bg-[#1E293B] text-white shadow-sm'
            : 'text-[#64748B] hover:text-[#1E293B]'
          }
        `}
      >
        {/* Map icon */}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m0 0l-3-3m3 3l3-3m-3 3V6.75M15 18.75V9m0 0l3 3m-3-3l-3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19A8.965 8.965 0 0112 3c2.17 0 4.166.768 5.723 2.048M17.886 18.81A8.965 8.965 0 0112 21a8.965 8.965 0 01-5.885-2.19" />
        </svg>
        Map
      </button>
    </div>
  );
}
