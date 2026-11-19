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
    expect(button.className).toContain("border-border");
    expect(button.className).toContain("h-8");
  });

  it("exposes buttonVariants helper via cva", () => {
    const classes = buttonVariants({ variant: "ghost", size: "lg" });
    expect(classes).toContain("hover:bg-accent");
    expect(classes).toContain("h-10");
  });
});
