import type { SiteContact } from '@/types/site';

interface ContactInfoProps {
  contacts: SiteContact[];
}

export default function ContactInfo({ contacts }: ContactInfoProps) {
  if (contacts.length === 0) {
    return (
      <p className="text-sm text-[#94A3B8] italic">No contact information available.</p>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact, index) => (
        <div
          key={`${contact.name}-${contact.trialNctId}-${index}`}
          className="flex gap-3 p-3 rounded-lg bg-white border border-[#E8E5DE]"
        >
          {/* Avatar placeholder */}
          <div className="w-9 h-9 rounded-full bg-[#F5F5F0] border border-[#E8E5DE] flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[#1E293B] truncate">{contact.name}</p>
            <p className="text-xs text-[#64748B]">{contact.role}</p>

            <div className="mt-1.5 space-y-0.5">
              {contact.email && (
                <p className="text-xs text-[#475569] flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[#94A3B8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="truncate">{contact.email}</span>
                </p>
              )}
              {contact.phone && (
                <p className="text-xs text-[#475569] flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[#94A3B8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{contact.phone}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
