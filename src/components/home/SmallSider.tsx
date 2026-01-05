export default function SmallSider({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: 'var(--font-color-secondary)' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: 'var(--font-color)' }}>{count}</span>
        </div>
        <div 
        className="w-16 h-1.5 rounded-full"
        style={{ backgroundColor: 'var(--background)' }}
        >
        <div 
            className="h-full rounded-full"
            style={{ backgroundColor: color, width: '0%' }}
        />
        </div>
    </div>
  );
}