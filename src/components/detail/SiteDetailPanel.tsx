'use client';

import type { Site } from '@/types/site';
import Drawer from '@/components/ui/Drawer';
import TrialList from './TrialList';
import ContactInfo from './ContactInfo';

interface SiteDetailPanelProps {
  site: Site | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteDetailPanel({ site, isOpen, onClose }: SiteDetailPanelProps) {
  if (!site) return null;

  const address = [site.city, site.state, site.country].filter(Boolean).join(', ');

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={site.facility}>
      <div className="space-y-6">
        {/* Site Overview */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#64748B]">{address}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white border border-[#E8E5DE]">
              <p className="text-2xl font-bold text-[#1E293B] tabular-nums">{site.trialCount}</p>
              <p className="text-xs text-[#64748B] mt-0.5">Clinical Trials</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E8E5DE]">
              <p className="text-2xl font-bold text-[#1E293B] tabular-nums">
                {site.totalEnrollment.toLocaleString()}
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">Total Enrollment</p>
            </div>
          </div>
        </section>

        {/* Trials */}
        <section>
          <h3 className="text-sm font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            Trials ({site.trials.length})
          </h3>
          <TrialList trials={site.trials} />
        </section>

        {/* Contacts */}
        <section>
          <h3 className="text-sm font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            Contacts ({site.contacts.length})
          </h3>
          <ContactInfo contacts={site.contacts} />
        </section>
      </div>
    </Drawer>
  );
}
