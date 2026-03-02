import type { SiteTrialSummary } from '@/types/site';
import TrialCard from './TrialCard';

interface TrialListProps {
  trials: SiteTrialSummary[];
}

export default function TrialList({ trials }: TrialListProps) {
  if (trials.length === 0) {
    return (
      <p className="text-sm text-[#94A3B8] italic">No trials associated with this site.</p>
    );
  }

  return (
    <div className="space-y-3">
      {trials.map((trial) => (
        <TrialCard key={trial.nctId} trial={trial} />
      ))}
    </div>
  );
}
