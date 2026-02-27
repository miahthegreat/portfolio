# Stable test selectors (data-testid)

Use these with Playwright's `getByTestId()` for reliable E2E tests.

## Home / Hero
| testid | Description |
|--------|-------------|
| `hero` | Hero section container |
| `hero-title` | Main heading (Jeremiah Schmid) |
| `hero-cta-about` | About button/link |
| `hero-cta-contact` | Contact button/link |
| `hero-cta-resume` | Resume button/link |
| `hero-dashboard-card` | Admin dashboard card link |

## Portfolio layout
| testid | Description |
|--------|-------------|
| `portfolio-shell` | Root portfolio layout wrapper |
| `main-scroll` | Scroll area for main content |
| `main-content` | Main content container |
| `portfolio-header` | Top header |
| `header-logo` | Portfolio logo (home link) |
| `header-desktop-nav` | Desktop nav container (md+) |
| `nav-link-home` | Nav link to / |
| `nav-link-about` | Nav link to /about |
| `nav-link-contact` | Nav link to /contact |
| `nav-link-resume` | Nav link to /resume |
| `header-dashboard-link` | Dashboard link in header |
| `header-theme-toggle` | Theme toggle wrapper in header |
| `bottom-nav` | Mobile bottom navigation |
| `bottom-nav-home` | Bottom nav: Home |
| `bottom-nav-about` | Bottom nav: About |
| `bottom-nav-contact` | Bottom nav: Contact |
| `bottom-nav-resume` | Bottom nav: Resume |
| `bottom-nav-dashboard` | Bottom nav: Dashboard |

## Dashboard
| testid | Description |
|--------|-------------|
| `dashboard-mobile-header` | Mobile dashboard header bar |
| `dashboard-mobile-menu-trigger` | Hamburger menu button |
| `dashboard-mobile-portfolio-link` | Portfolio link (mobile) |
| `dashboard-mobile-theme-toggle` | Theme toggle (mobile) |
| `dashboard-desktop-theme-toggle` | Floating theme toggle (desktop) |
| `dashboard-main` | Main content area |
| `dashboard-sidebar` | Sidebar (desktop) |
| `dashboard-property-select` | Property dropdown trigger |
| `dashboard-sidebar-nav` | Sidebar navigation |
| `sidebar-link-overview` | Sidebar: Overview |
| `sidebar-link-onboarding` | Sidebar: Onboarding |
| `sidebar-link-marketplace` | Sidebar: Marketplace |
| `sidebar-link-analytics` | Sidebar: Analytics |
| `sidebar-link-docs` | Sidebar: Docs |
| `sidebar-portfolio-link` | Sidebar: Portfolio link |
| `dashboard-overview-page` | Dashboard overview page container |
| `dashboard-section-onboarding` | Overview card: Onboarding |
| `dashboard-section-marketplace` | Overview card: Marketplace |
| `dashboard-section-analytics` | Overview card: Analytics |

## Onboarding
| testid | Description |
|--------|-------------|
| `onboarding-page` | Onboarding page container |
| `onboarding-no-property` | State when no property selected |
| `onboarding-resident-select` | Resident dropdown trigger |
| `onboarding-view-tabs` | View tabs (checklist/kanban/table) |
| `onboarding-view-tab-checklist` | Checklist tab |
| `onboarding-view-tab-kanban` | Kanban tab |
| `onboarding-view-tab-table` | Table tab |
| `onboarding-new-task-btn` | New task button |
| `onboarding-progress` | Progress section |
| `onboarding-task-list` | Checklist view task list |
| `onboarding-kanban` | Kanban view container |
| `onboarding-task-cards` | Mobile table view (stacked cards) |
| `onboarding-task-card` | Single task card (mobile); use `data-task-id` for specific task |
| `onboarding-task-table` | Desktop table view |
| `onboarding-task-row` | Table row; use `data-task-id` for specific task |
| `task-actions-trigger` | Task actions menu trigger (⋮) |
| `onboarding-empty-tasks` | Empty state card |
| `onboarding-create-first-task` | Create first task button (empty state) |

## Marketplace
| testid | Description |
|--------|-------------|
| `marketplace-page` | Marketplace page container |
| `marketplace-tabs` | Services / Orders tabs |
| `marketplace-tab-services` | Services tab |
| `marketplace-tab-orders` | Orders tab |
| `marketplace-new-service-btn` | New service button |

## Docs
| testid | Description |
|--------|-------------|
| `docs-page` | Docs page container |
| `docs-nav` | Section navigation |
| `docs-nav-overview` | Nav link: Overview |
| `docs-nav-tech-stack` | Nav link: Tech stack |
| `docs-nav-setup` | Nav link: Development setup |
| `docs-nav-testing` | Nav link: Testing |
| `docs-nav-api` | Nav link: API reference |
| `docs-section-overview` | Overview section |
| `docs-section-tech-stack` | Tech stack section |
| `docs-section-setup` | Development setup section |
| `docs-section-testing` | Testing section |
| `docs-section-api` | API reference section |

## Usage example (Playwright)

```ts
import { test, expect } from '@playwright/test';

test('hero has CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('hero')).toBeVisible();
  await expect(page.getByTestId('hero-cta-about')).toBeVisible();
  await page.getByTestId('hero-cta-about').click();
  await expect(page).toHaveURL(/\/about/);
});

test('onboarding table view', async ({ page }) => {
  await page.goto('/dashboard/onboarding');
  await page.getByTestId('onboarding-resident-select').click();
  await page.getByTestId('onboarding-view-tab-table').click();
  await expect(page.getByTestId('onboarding-task-table')).toBeVisible();
});
```
