import { test, expect } from '@playwright/test';
import { SignInPage } from './pages/sign-in.page';
import { Wishlist } from './pages/wishlist';

test('should add product to wishlist', async ({ page }) => {
	const productName = 'Training Duffel Bag Model 01';
	const wishlist = new Wishlist(page);
	await wishlist.addToWishList(productName);
	const toastStatus = page.getByRole('status');
	const toastSpan = toastStatus.locator('span');
	await expect(toastSpan).toHaveText('Item added to your wishlist.');
});

test('should delete product from wishlist', async ({ page }) => {
	const productName = 'Training Duffel Bag Model 01';
	const wishlist = new Wishlist(page);
	// add product to wishlist
	await wishlist.addToWishList(productName);

	// remove product to wishlist
	await wishlist.addToWishList(productName);
	const toastStatus = page.getByRole('status');
	const toastSpan = toastStatus.locator('span');
	await expect(toastSpan).toHaveText('Item removed from your wishlist.');
});
test('should open wishlist drawer with products on it if user add product to wishlist', async ({
	page,
}) => {
	const productName = 'Training Duffel Bag Model 01';
	const wishlist = new Wishlist(page);
	await wishlist.addToWishList(productName);
	await page.getByRole('button', { name: 'Wishlist drawer' }).click();
	await expect(
		page.getByRole('heading', { level: 6, name: 'WISHLIST' }),
	).toBeVisible();
	await expect(
		page.locator('p[class*="font-semibold"]').filter({ hasText: productName }),
	).toBeVisible();
});

test('should delete product in wishlist drawer if user clicks remove from wishlist button', async ({
	page,
}) => {
	const productName = 'Training Duffel Bag Model 01';
	const wishlist = new Wishlist(page);
	await wishlist.addToWishList(productName);
	await page.getByRole('button', { name: 'Wishlist drawer' }).click();
	await page.getByRole('button', { name: 'More options' }).click();
	await page.getByRole('button', { name: 'Remove from wishlist' }).click();
	await expect(
		page.getByRole('heading', { level: 2, name: 'Your wishlist is empty' }),
	).toBeVisible();
});

test('should retain product wishlist after user sign in', async ({ page }) => {
	const productName = 'Training Duffel Bag Model 01';
	const wishlist = new Wishlist(page);
	await wishlist.addToWishList(productName);
	const signIn = new SignInPage(page);
	// guest flow wishlist
	await page.getByRole('button', { name: 'Wishlist drawer' }).click();
	await expect(
		page.locator('p[class*="font-semibold"]').filter({ hasText: productName }),
	).toBeVisible();
	await page.getByRole('button', { name: 'Close Drawer' }).click();
	await signIn.login('estebancasas9817@gmail.com', '12345678');
	// sign in flow wishlist
	await page.getByRole('button', { name: 'Wishlist drawer' }).click();
	await expect(
		page.locator('p[class*="font-semibold"]').filter({ hasText: productName }),
	).toBeVisible();
});
