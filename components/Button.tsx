import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/className';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md duration-200 ease-in-out',
  {
    variants: {
      variant: {
        primary:
          'border border-solid border-transparent bg-[#184253] text-white hover:bg-blue-800 hover:text-white focus:border-blue-800 focus:outline-none active:bg-blue-800',
        secondary:
          'border border-solid border-zinc-300 bg-white text-zinc-500 hover:border-zinc-700 hover:text-zinc-800 focus:border-zinc-700 active:border-zinc-700 active:bg-zinc-50 active:text-zinc-800',
        outline:
          'border border-zinc-300/50 bg-white text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 focus:border-blue-300 active:bg-zinc-100 active:text-zinc-700',
        ghost:
          'bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-700 focus:border-blue-300 active:bg-zinc-100 active:text-zinc-700',
        danger:
          'border border-solid border-transparent bg-red-600 text-white hover:bg-red-800 hover:text-white focus:border-red-800 focus:outline-none active:bg-red-800',
      },
      size: {
        default: 'px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
