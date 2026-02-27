import { test, expect } from "@playwright/test";

test.describe("Home / Hero", () => {
  test("hero section is visible and has title", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("hero")).toBeVisible();
    await expect(page.getByTestId("hero-title")).toContainText("Jeremiah");
    await expect(page.getByTestId("hero-title")).toContainText("Schmid");
  });

  test("hero CTAs are visible and navigable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("hero-cta-about")).toBeVisible();
    await expect(page.getByTestId("hero-cta-contact")).toBeVisible();
    await expect(page.getByTestId("hero-cta-resume")).toBeVisible();
    await page.getByTestId("hero-cta-about").click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("hero dashboard card links to dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("hero-dashboard-card")).toBeVisible();
    await page.getByTestId("hero-dashboard-card").click();
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

test.describe("Portfolio header", () => {
  test("header and nav links are visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("portfolio-header")).toBeVisible();
    await expect(page.getByTestId("header-logo")).toBeVisible();
    await expect(page.getByTestId("header-dashboard-link")).toBeVisible();
  });
});
