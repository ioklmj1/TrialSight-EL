'use client';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchMode: 'sites' | 'pi';
  onSearchModeChange: (mode: 'sites' | 'pi') => void;
  piName: string;
  onPINameChange: (name: string) => void;
}

export default function Header({
  searchTerm,
  onSearchChange,
  searchMode,
  onSearchModeChange,
  piName,
  onPINameChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FAFAF5] border-b border-[#E8E5DE]">
      <div className="flex items-center gap-4 px-5 py-3 max-w-[1600px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center">
            <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-[#1E293B] tracking-tight">Enlace Labs BD</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-auto">
          {searchMode === 'sites' ? (
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search clinical trial sites..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <input
                type="text"
                value={piName}
                onChange={(e) => onPINameChange(e.target.value)}
                placeholder="Search by Principal Investigator name..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E8E5DE] text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
              />
              {piName && (
                <button
                  type="button"
                  onClick={() => onPINameChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Search Mode Toggle */}
        <div className="flex items-center shrink-0 bg-white border border-[#E8E5DE] rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => onSearchModeChange('sites')}
            className={`
              px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer
              ${searchMode === 'sites'
                ? 'bg-[#0D9488] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#1E293B]'
              }
            `}
          >
            Sites
          </button>
          <button
            type="button"
            onClick={() => onSearchModeChange('pi')}
            className={`
              px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer
              ${searchMode === 'pi'
                ? 'bg-[#0D9488] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#1E293B]'
              }
            `}
          >
            PI
          </button>
        </div>
      </div>
    </header>
  );
}
