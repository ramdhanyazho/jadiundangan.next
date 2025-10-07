import * as React from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-purple-600 text-white shadow-lg shadow-purple-500/30 hover:bg-purple-500 focus-visible:outline-purple-400 disabled:bg-purple-600/60',
  ghost:
    'bg-transparent text-purple-200 hover:text-white hover:bg-white/10 focus-visible:outline-purple-400 disabled:text-purple-200/50',
  outline:
    'border border-white/20 text-white hover:bg-white/10 focus-visible:outline-purple-400 disabled:text-white/50 disabled:border-white/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const buttonStyles = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md'
) =>
  cn(
    'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
    variantClasses[variant],
    sizeClasses[size]
  );

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return <button ref={ref} className={cn(buttonStyles(variant, size), className)} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button };
