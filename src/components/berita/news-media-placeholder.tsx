import type { ComponentProps } from "react";
import { PlaceholdImage } from "@/components/ui/placehold-image";
import { cn } from "@/utils/cn";

export interface NewsMediaPlaceholderProps extends ComponentProps<"div"> {
  label: string;
  /**
   * Visual variation of the placehold.co colors so adjacent cards differ,
   * mirroring the Figma placeholder tiles.
   */
  variant?: 1 | 2 | 3;
  /** CSS logical px of the requested image; the box is sized by className. */
  width?: number;
  height?: number;
}

/**
 * Media placeholder that renders a placehold.co image with the label text
 * baked in ("Foto <label> (placeholder)") used across marquee, galeri and
 * news cards (specs §5–§7). Defaults to 640×360 for cards; the marquee
 * overrides via width/height props. Purely presentational.
 */
export function NewsMediaPlaceholder({
  label,
  variant = 1,
  width = 640,
  height = 360,
  className,
  ...props
}: NewsMediaPlaceholderProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      {...props}
    >
      <PlaceholdImage
        label={label}
        width={width}
        height={height}
        variant={variant}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
