import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface NewsMediaPlaceholderProps extends ComponentProps<"div"> {
  label: string;
  /**
   * Visual variation of the gold gradient so adjacent cards differ,
   * mirroring the Figma placeholder tiles.
   */
  variant?: 1 | 2 | 3;
}

const VARIANT_GRADIENTS: Record<1 | 2 | 3, string> = {
  1: "bg-gradient-to-br from-gold-soft to-gold-soft-strong",
  2: "bg-gradient-to-b from-gold-soft to-gold-soft-strong",
  3: "bg-gradient-to-tr from-gold-soft to-gold-soft-strong",
};

/**
 * Gold gradient media placeholder (#FBF6DF → #F6EFAF) with the bottom-left
 * white pill label + gold dot used across marquee, galeri and news cards
 * (specs §5–§7). Defaults to r16 for cards; the marquee overrides to r24
 * via className. Purely presentational; no external images.
 */
export function NewsMediaPlaceholder({
  label,
  variant = 1,
  className,
  ...props
}: NewsMediaPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-2xl",
        VARIANT_GRADIENTS[variant],
        className,
      )}
      {...props}
    >
      <span className="text-sm font-semibold text-body-muted">
        Foto {label} (placeholder)
      </span>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 text-xs font-semibold text-ink shadow-xs">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
        {label}
      </span>
    </div>
  );
}
