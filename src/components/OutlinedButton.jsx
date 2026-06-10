import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function OutlinedButton({
  children,
  onClick,
  href,
  variant = 'light',
  className,
}) {
  const isDark = variant === 'dark';

  const baseClasses = cn(
    'inline-flex items-center gap-2 px-6 py-3 border font-body text-sm tracking-[0.04em]',
    'transition-all duration-250',
    isDark
      ? 'border-[#111111]/30 text-[#111111] hover:bg-[#111111] hover:text-[#EAE8E1]'
      : 'border-[#EAE8E1]/40 text-[#EAE8E1] hover:bg-[#EAE8E1] hover:text-[#111111]',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
