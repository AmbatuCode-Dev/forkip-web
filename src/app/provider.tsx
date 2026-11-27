"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

export function AppProvider({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
