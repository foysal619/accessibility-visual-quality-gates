import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => page.goto('/'));

test('has no automatically detectable WCAG A/AA violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('supports keyboard-only navigation and disclosure state', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('button', { name: 'Show quality details' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Hide quality details' })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Accessibility, keyboard, ARIA, and visual gates are active.')).toBeVisible();
});

test('preserves the page accessibility structure', async ({ page }) => {
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - link "Skip to main content"
    - banner:
      - link "Pulse QA"
      - navigation "Primary":
        - link "Overview"
        - link "Checks"
    - main:
      - region "Quality signals that everyone can use":
        - heading "Quality signals that everyone can use" [level=1]
        - button "Show quality details"
      - region "Active checks":
        - heading "Active checks" [level=2]
        - list:
          - listitem: WCAG scan
          - listitem: Keyboard flow
          - listitem: Visual baseline
  `);
});
