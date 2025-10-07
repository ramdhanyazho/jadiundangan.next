import * as React from 'react';

import { cn } from '@/lib/utils';

type AlertVariant = 'default' | 'success' | 'error';

const variantClasses: Record<AlertVariant, string> = {
  default: 'border-white/10 bg-white/10 text-white',
  success: 'border-emerald-400/40 bg-emerald-500/20 text-emerald-100',
  error: 'border-red-400/40 bg-red-500/20 text-red-100',
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(
        'flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-sm backdrop-blur-xl',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';
