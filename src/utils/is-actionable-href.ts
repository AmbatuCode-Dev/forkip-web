/** Returns true when an href points to a real destination instead of a placeholder. */
export function isActionableHref(href: string | null | undefined): boolean {
  return Boolean(href && href.trim() !== "" && href !== "#");
}
