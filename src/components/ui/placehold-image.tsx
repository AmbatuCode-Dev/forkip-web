import Image from "next/image";

const BG: Record<1 | 2 | 3, string> = { 1: "F6EFAF", 2: "FBF6DF", 3: "EFDFA8" };
const FG: Record<1 | 2 | 3, string> = { 1: "8A6D00", 2: "8A6D00", 3: "7A5E00" };

export interface PlaceholdImageProps {
  label: string;
  /** CSS logical px; also used as intrinsic size (1x request). */
  width: number;
  height: number;
  /** Visual variation so adjacent tiles differ. */
  variant?: 1 | 2 | 3;
  className?: string;
}

export function PlaceholdImage({
  label,
  width,
  height,
  variant = 1,
  className,
}: PlaceholdImageProps) {
  // Callers may already pass a "Foto …"-prefixed label; avoid doubling it.
  const name = label.startsWith("Foto ") ? label : `Foto ${label}`;
  const alt = `${name} (placeholder)`;
  return (
    <Image
      src={`https://placehold.co/${width}x${height}/${BG[variant]}/${FG[variant]}?text=${encodeURIComponent(alt)}`}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      className={className}
    />
  );
}
