import Link from 'next/link';

interface LogoProps {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

export default function Logo({ href = '/', size = 'md', dark = false }: LogoProps) {
  const textColor = dark ? '#FAF6F1' : '#7A5830';
  const bgColor = dark ? 'rgba(255,255,255,0.12)' : '#F5EDE0';
  const fontSize = size === 'sm' ? 16 : size === 'lg' ? 26 : 20;
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const letterSpacing = size === 'sm' ? '2px' : '3px';

  return (
    <Link href={href} className="flex items-center gap-2 no-underline flex-shrink-0">
      <svg width={iconSize} height={iconSize} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" rx="8" fill={bgColor} />
        {/* Floral/Leaf motif */}
        <path d="M22 8 C18 12 14 16 14 20 C14 24 17 27 22 27 C27 27 30 24 30 20 C30 16 26 12 22 8Z" fill={textColor} opacity="0.25"/>
        <path d="M22 12 C20 15 18 18 18 21 C18 24 19.5 26 22 26 C24.5 26 26 24 26 21 C26 18 24 15 22 12Z" fill={textColor} opacity="0.5"/>
        <text x="22" y="38" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="13" fontWeight="700" fill={textColor} letterSpacing="1">M</text>
      </svg>
      <div className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize,
            fontWeight: 600,
            color: textColor,
            letterSpacing,
            textTransform: 'uppercase',
          }}
        >
          MEHERVA
        </span>
      </div>
    </Link>
  );
}
