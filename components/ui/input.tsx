import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
