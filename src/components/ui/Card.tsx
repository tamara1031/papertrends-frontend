import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'research' | 'feature'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseClasses = 'rounded-2xl border transition-all duration-300'
    
    const variants = {
      default: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm',
      research: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/30',
      feature: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20',
      paper: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105',
      info: 'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-600/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 backdrop-blur-sm'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card }
