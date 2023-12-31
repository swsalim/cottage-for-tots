import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md duration-200 ease-in-out',
  {
    variants: {
      variant: {
        primary:
          'border border-solid border-transparent bg-[#184253] text-white hover:bg-blue-800 hover:text-white focus:border-blue-800 focus:outline-none active:bg-blue-800',
        secondary:
          'border border-solid border-slate-300 bg-white text-slate-500 hover:border-slate-700 hover:text-slate-800 focus:border-slate-700 active:border-slate-700 active:bg-slate-50 active:text-slate-800',
        outline:
          'border border-slate-300/50 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700 focus:border-blue-300 active:bg-slate-100 active:text-slate-700',
        ghost:
          'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-700 focus:border-blue-300 active:bg-slate-100 active:text-slate-700',
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
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
