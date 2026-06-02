import { expect, test } from '@playwright/test';

test('set a bedtime, run the ritual, the screen dims', async ({ page }) => {
  await page.goto('/');
  const heading = page.getByRole('heading', { name: /When should the day end/ });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS('opacity', '1');

  await page.getByRole('button', { name: '23:00', exact: true }).click();
  await page.getByRole('button', { name: 'Start winding down now' }).click();
  await expect(page.getByText(/Step 1 of/)).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('body.dim')).toHaveCount(1);

  // The bedtime choice persists.
  await page.reload();
  await expect(page.getByRole('button', { name: '23:00', exact: true })).toHaveClass(/on/);
});
