import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  header: ReactNode;
  filterBar: ReactNode;
}

export default function AppShell({ children, header, filterBar }: AppShellProps) {
  return (
    <div className="h-screen bg-[#F5F5F0] flex flex-col overflow-hidden">
      {header}
      {filterBar}
      <main className="flex-1 min-h-0 relative flex flex-col">{children}</main>
    </div>
  );
}
