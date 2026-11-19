import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@halmahera/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Soft sheen: a faint white-to-clear gradient over a solid color. Hover fades the color, press scales.
const sheen = "bg-[linear-gradient(180deg,rgb(255_255_255/0.14),transparent)]";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 pressable items-center justify-center rounded-full text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: `${sheen} bg-primary text-primary-foreground hover:bg-foreground`,
        brand: `${sheen} bg-brand text-brand-foreground hover:bg-brand/90`,
        neutral: "bg-foreground text-background hover:bg-foreground/85",
        outline:
          "border border-border bg-transparent hover:bg-accent aria-expanded:bg-accent aria-expanded:text-foreground",
        secondary: `${sheen} bg-secondary text-secondary-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:shadow-[inset_0_0_0_1px_var(--input)] aria-expanded:shadow-[inset_0_0_0_1px_var(--input)]`,
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground",
        destructive: `${sheen} bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40`,
        link: "text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "h-8 gap-1.5 px-3.5 text-[13px]",
        xs: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-3 text-[13px]",
        lg: "h-11 gap-1.5 px-5 text-base",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
