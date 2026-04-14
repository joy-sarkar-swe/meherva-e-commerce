const badgeColors: Record<string, string> = {
  New: '#4A90A4',
  Trending: '#E07B54',
  Hot: '#C94040',
  Premium: '#8B6A3E',
  Exclusive: '#6B4F8E',
  Festive: '#B85C38',
};

export default function Badge({ label }: { label: string }) {
  if (!label) return null;
  const bg = badgeColors[label] || '#A07845';
  return (
    <span
      style={{
        background: bg,
        color: '#fff',
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        padding: '3px 8px',
        borderRadius: '4px',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  );
}
