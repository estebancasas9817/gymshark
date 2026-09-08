import { test, expect } from '@playwright/test';
import { Cart } from './pages/cart';
import { SignInPage } from './pages/sign-in.page';

test('should add product to cart', async ({ page }) => {
	const productName = 'Training Duffel Bag Model 01';
	const size = 'ONE SIZE';
	const cart = new Cart(page);
	await cart.addToCart({
		productName,
		size,
	});

	await expect(
		page.getByRole('heading', { level: 6, name: 'YOUR BAG' }),
	).toBeVisible();
	await expect(
		page.getByRole('heading', {
			level: 6,
			name: productName,
		}),
	).toBeVisible();
	await expect(
		page.getByRole('button', {
			name: 'CHECKOUT SECURELY',
		}),
	).toBeVisible();
});
test('should increase quantity of cart', async ({ page }) => {
	const productName = 'Training Duffel Bag Model 02';
	const size = 'ONE SIZE';
	const cart = new Cart(page);
	await cart.addToCart({
		productName,
		size,
	});
	const decreaseBtn = page.getByRole('button', { name: 'Decrease quantity' });
	await expect(decreaseBtn.locator('+ span')).toHaveText('1');
	await page.getByRole('button', { name: 'Increase quantity' }).click();
	await expect(decreaseBtn.locator('+ span')).toHaveText('2');
});

test('should delete product in cart drawer if user decrease quantity by one resulting in 0', async ({
	page,
}) => {
	const productName = 'Training Duffel Bag Model 03';
	const size = 'ONE SIZE';
	const cart = new Cart(page);
	await cart.addToCart({
		productName,
		size,
	});
	const decreaseBtn = page.getByRole('button', { name: 'Decrease quantity' });
	await expect(decreaseBtn.locator('+ span')).toHaveText('1');
	await decreaseBtn.click();
	await expect(
		page.getByRole('heading', { level: 6, name: 'Your bag is empty' }),
	).toBeVisible();
});

test('should retain product cart after user sign in', async ({ page }) => {
	const productName = 'Training Duffel Bag Model 01';
	const size = 'ONE SIZE';
	const signIn = new SignInPage(page);
	const cart = new Cart(page);
	await cart.addToCart({
		productName,
		size,
	});
	await page.getByRole('button', { name: 'Close Drawer' }).click();
	const cartDrawerBtn = page.getByRole('button', { name: 'Cart drawer' });
	// cart quantity guest flow
	await expect(cartDrawerBtn.locator('span')).toHaveText('1');
	await signIn.login('estebancasas9817@gmail.com', '12345678');
	// cart quantity should be 11 (10 he already had plus this new one)
	await expect(cartDrawerBtn.locator('span')).toHaveText('11');
});
