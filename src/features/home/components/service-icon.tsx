import type { IconComponent } from "@coolicons/react";
import {
  Archive,
  Atm,
  ChatHelp,
  HandKey,
  ShieldCheck,
  Wallet,
} from "@coolicons/react";
import type { ServiceIcon } from "../types";

interface IconProps {
  className?: string;
}

const ICONS: Record<ServiceIcon, IconComponent> = {
  question: ChatHelp,
  rental: HandKey,
  wallet: Wallet,
  verification: ShieldCheck,
  withdrawal: Atm,
  archive: Archive,
};

/**
 * Line icons for the Layanan cards (@coolicons/react, root import = Line).
 * All icons render a 24×24 line SVG using currentColor; sizing and colour
 * come from the parent className.
 */
export function ServiceIconGlyph({
  icon,
  className,
}: IconProps & { icon: ServiceIcon }) {
  const Glyph = ICONS[icon];
  return <Glyph aria-hidden="true" className={className} />;
}
