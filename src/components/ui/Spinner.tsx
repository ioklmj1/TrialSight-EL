interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-3',
};

export default function Spinner({ size = 'md' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-solid border-[#0D9488] border-t-transparent`}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
