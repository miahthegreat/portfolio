import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const publicRoutes = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/resume", name: "Resume" },
  { path: "/contact", name: "Contact" },
  { path: "/projects", name: "Projects" },
] as const;

test.describe("Accessibility (axe)", () => {
  for (const { path, name } of publicRoutes) {
    test(`${name} (${path}) has no axe WCAG 2 A/AA violations`, async ({ page }) => {
      await page.goto(path);
      const builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]);
      // Exclude dashboard sidebar when it appears in DOM on non-dashboard routes (e.g. /projects)
      if (path === "/projects") {
        builder.exclude('[data-testid="dashboard-sidebar"]');
      }
      const results = await builder.analyze();

      const violations = results.violations;
      if (violations.length > 0) {
        const summary = violations
          .map(
            (v) =>
              `[${v.id}] ${v.help}\n  Impact: ${v.impact}\n  ${v.nodes.length} node(s)\n  ${v.nodes.map((n) => n.html).join("\n  ")}`
          )
          .join("\n\n");
        expect(violations, `Axe violations on ${path}:\n${summary}`).toEqual([]);
      }
    });
  }

  test("Dashboard login has no axe WCAG 2 A/AA violations", async ({ page }) => {
    await page.goto("/dashboard/login");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const violations = results.violations;
    if (violations.length > 0) {
      const summary = violations
        .map(
          (v) =>
            `[${v.id}] ${v.help}\n  Impact: ${v.impact}\n  ${v.nodes.length} node(s)\n  ${v.nodes.map((n) => n.html).join("\n  ")}`
        )
        .join("\n\n");
      expect(violations, `Axe violations on /dashboard/login:\n${summary}`).toEqual([]);
    }
  });
});
