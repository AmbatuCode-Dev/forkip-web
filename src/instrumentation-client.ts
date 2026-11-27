type RouterNavigationType = "push" | "replace" | "traverse";

type NavigationGlobal = typeof globalThis & {
  __forkipNavType?: RouterNavigationType;
};

/** Records how the current App Router navigation started so Lenis can react. */
export function onRouterTransitionStart(
  _url: string,
  navigationType: RouterNavigationType,
) {
  (globalThis as NavigationGlobal).__forkipNavType = navigationType;
}
