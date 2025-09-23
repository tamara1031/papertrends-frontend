import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib'

interface IconContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'gradient' | 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  gradient?: 'ai' | 'cs' | 'math' | 'physics' | 'bio' | 'econ' | 'stat' | 'eng' | 'other' | string
}

const IconContainer = forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, variant = 'gradient', size = 'md', gradient = 'cs', ...props }, ref) => {
    const baseClasses = 'icon-container-base'
    
    const variants = {
      gradient: `bg-gradient-${gradient} icon-container-gradient`,
      solid: 'bg-slate-600 dark:bg-slate-400',
      outline: 'border-2 border-slate-300 dark:border-slate-600 bg-transparent'
    }
    
    const sizes = {
      sm: 'w-6 h-6 text-xs',
      md: 'w-8 h-8 text-sm',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-2xl'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

IconContainer.displayName = 'IconContainer'

export { IconContainer }
