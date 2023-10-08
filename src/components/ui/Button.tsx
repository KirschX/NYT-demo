import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "inline-flex leading-[24px] items-center justify-center rounded-[16px] text-[16px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "text-white bg-Blue_Main hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 ",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-[16px]",
        lg: "h-11 px-8 rounded-[16px] w-full h-[60px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          to={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
