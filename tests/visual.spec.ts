import { expect, test } from '@playwright/test';

test('protects the deterministic release-signal graphic', async ({ page }) => {
  await page.goto('/visual.html');
  await expect(page.getByTestId('visual-card')).toHaveScreenshot('release-signal.png', { animations: 'disabled' });
});
