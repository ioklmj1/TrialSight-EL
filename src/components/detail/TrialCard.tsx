import type { SiteTrialSummary } from '@/types/site';
import Badge from '@/components/ui/Badge';
import { STATUS_OPTIONS, PHASE_LABEL_MAP } from '@/lib/constants';

interface TrialCardProps {
  trial: SiteTrialSummary;
}

export default function TrialCard({ trial }: TrialCardProps) {
  const statusOption = STATUS_OPTIONS.find((s) => s.value === trial.overallStatus);
  const phaseLabel = trial.phases.map((p) => PHASE_LABEL_MAP[p] || p).join(', ');

  return (
    <div className="p-4 rounded-xl bg-white border border-[#E8E5DE] space-y-3">
      {/* NCT ID + Status */}
      <div className="flex items-start justify-between gap-2">
        <a
          href={`https://clinicaltrials.gov/study/${trial.nctId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono font-medium text-[#0D9488] hover:text-[#0F766E] hover:underline transition-colors"
        >
          {trial.nctId}
        </a>
        {statusOption && (
          <Badge
            label={statusOption.label}
            color={statusOption.color}
            variant="solid"
          />
        )}
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-[#1E293B] leading-snug">
        {trial.briefTitle}
      </h4>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B]">
        {phaseLabel && (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            {phaseLabel}
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
          {trial.sponsor}
        </span>
        {trial.enrollment && (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            {trial.enrollment.toLocaleString()} enrolled
          </span>
        )}
      </div>

      {/* Conditions */}
      {trial.conditions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {trial.conditions.slice(0, 4).map((cond) => (
            <Badge key={cond} label={cond} color="#475569" />
          ))}
          {trial.conditions.length > 4 && (
            <span className="text-xs text-[#94A3B8] self-center">
              +{trial.conditions.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Interventions */}
      {trial.interventions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {trial.interventions.slice(0, 3).map((intv) => (
            <Badge key={intv} label={intv} color="#0D9488" />
          ))}
          {trial.interventions.length > 3 && (
            <span className="text-xs text-[#94A3B8] self-center">
              +{trial.interventions.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
