import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'gold',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer border';

  const variants = {
    gold: 'bg-[var(--gold)] text-white border-[var(--gold)] hover:bg-[var(--gold-dark)] hover:border-[var(--gold-dark)]',
    outline: 'bg-transparent text-[var(--gold-dark)] border-[var(--gold)] hover:bg-[var(--gold)] hover:text-white',
    ghost: 'bg-transparent text-[var(--text-mid)] border-transparent hover:bg-[var(--cream-dark)] hover:text-[var(--gold-dark)]',
  };

  const sizes = {
    sm: 'text-[11px] px-4 py-2 rounded-[6px]',
    md: 'text-[12px] px-6 py-3 rounded-[8px]',
    lg: 'text-[13px] px-8 py-4 rounded-[10px]',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
