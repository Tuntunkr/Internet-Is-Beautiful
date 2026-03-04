import { Link } from 'react-router-dom'

/**
 * Logo component - globe/network icon + brand name
 */
export function Logo({ className = '', showText = true, size = 'md', textClassName = '' }) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Internet Is Beautiful - Home"
    >
      <svg
        className={`shrink-0 ${sizes[size]}`}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
        <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="16" cy="16" r="2" fill="white" />
        <path
          d="M16 10v0M16 22v0M10 16h0M22 16h0"
          stroke="white"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
      </svg>
      {showText && (
        <span className={`font-display font-semibold tracking-tight text-gray-900 dark:text-white ${textClassName}`}>
          Internet Is Beautiful
        </span>
      )}
    </Link>
  )
}
