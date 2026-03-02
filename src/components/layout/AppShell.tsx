import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  header: ReactNode;
  filterBar: ReactNode;
}

export default function AppShell({ children, header, filterBar }: AppShellProps) {
  return (
    <div className="h-screen bg-[#F5F5F0] flex flex-col overflow-hidden">
      <div className="relative z-20">{header}</div>
      <div className="relative z-20">{filterBar}</div>
      <main className="flex-1 min-h-0 relative z-0 flex flex-col">{children}</main>
    </div>
  );
}
