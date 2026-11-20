import { describe, expect, it } from "vitest";
import { Button, buttonVariants } from "@/components/ui/button";
import { render, screen } from "@/testing/test-utils";

describe("Button", () => {
  it("renders children and defaults to type='button'", () => {
    render(<Button>Save changes</Button>);
    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("h-9");
  });

  it("applies cva variant, size, and disabled props", () => {
    render(
      <Button variant="outline" size="sm" disabled>
        Disabled
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    expect(button.className).toContain("border-gold-outline");
    expect(button.className).toContain("h-8");
  });

  it("styles the gold CTA per Figma (pill, 13/24 padding, dark-gold hover)", () => {
    const classes = buttonVariants({ variant: "gold", size: "cta" });
    expect(classes).toContain("rounded-full");
    expect(classes).toContain("bg-gold");
    expect(classes).toContain("hover:bg-gold-dark");
    expect(classes).toContain("py-3.25");
    expect(classes).toContain("px-6");
    expect(classes).toContain("text-15");
  });

  it("exposes buttonVariants helper via cva", () => {
    const classes = buttonVariants({ variant: "ghost", size: "lg" });
    expect(classes).toContain("hover:bg-accent");
    expect(classes).toContain("h-10");
  });
});
