import { forwardRef } from 'react'

export const FloatingInput = forwardRef(
  ({ label, id, className = '', error, ...props }, ref) => {

    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          {...props}
          placeholder=" "
          className={`peer w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 pt-6 pb-2 text-gray-900 dark:text-white placeholder-transparent outline-none transition-all focus:border-accent-500 focus:bg-white/10 focus:ring-2 focus:ring-accent-500/20 dark:focus:bg-white/5 ${
            error ? 'border-red-500' : ''
          } ${className}`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-accent-500 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-accent-500"
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

FloatingInput.displayName = 'FloatingInput'

export const FloatingTextarea = forwardRef(
  ({ label, id, className = '', error, ...props }, ref) => {
    const hasValue = props.value !== undefined && props.value !== ''

    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          {...props}
          placeholder=" "
          className={`peer w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 pt-8 pb-4 text-gray-900 dark:text-white placeholder-transparent outline-none transition-all focus:border-accent-500 focus:bg-white/10 focus:ring-2 focus:ring-accent-500/20 resize-none dark:focus:bg-white/5 ${
            error ? 'border-red-500' : ''
          } ${className}`}
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-5 text-gray-500 transition-all duration-200 peer-focus:top-3 peer-focus:text-xs peer-focus:font-medium peer-focus:text-accent-500 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-accent-500 ${
            hasValue ? 'top-3 text-xs font-medium text-accent-500' : ''
          }`}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

FloatingTextarea.displayName = 'FloatingTextarea'

export const FloatingSelect = forwardRef(
  ({ label, id, className = '', error, children, ...props }, ref) => {
    const hasValue = props.value !== undefined && props.value !== ''

    return (
      <div className="relative">
        <select
          ref={ref}
          id={id}
          {...props}
          className={`peer w-full appearance-none rounded-xl border-2 border-white/10 bg-white/5 px-4 pt-6 pb-2 pr-10 text-gray-900 dark:text-white outline-none transition-all focus:border-accent-500 focus:bg-white/10 focus:ring-2 focus:ring-accent-500/20 dark:focus:bg-white/5 ${className}`}
        >
          <option value="" />
          {children}
        </select>
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-accent-500 peer-[:not([value=""]):valid:top-3 peer-[:not([value=""]):valid:translate-y-0 peer-[:not([value=""]):valid:text-xs peer-[:not([value=""]):valid:font-medium peer-[:not([value=""]):valid:text-accent-500 ${
            hasValue ? 'top-3 translate-y-0 text-xs font-medium text-accent-500' : ''
          }`}
        >
          {label}
        </label>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

FloatingSelect.displayName = 'FloatingSelect'
