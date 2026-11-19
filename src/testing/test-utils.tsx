import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

export * from "@testing-library/react";

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, options);
}
