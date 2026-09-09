import { test, expect } from '@playwright/test';
import { CheckoutPage } from './pages/checkout';
import { Cart } from './pages/cart';

test.beforeEach(async ({ page }) => {
	const cart = new Cart(page);
	await cart.addToCart({
		productName: 'Training Duffel Bag Model 01',
		size: 'ONE SIZE',
	});
	await page.getByRole('button', { name: 'CHECKOUT SECURELY' }).click();
});

test('should redirect to /checkout/success if payment was successfull', async ({
	page,
}) => {
	// checkout stripe
	const checkout = new CheckoutPage(page);
	await checkout.pay({
		cardNumber: '4242 4242 4242 4242',
		city: 'Bogota',
		country: 'Colombia',
		cvc: '123',
		department: 'Cundinamarca',
		email: 'test@gmail.com',
		expirationDate: '0631',
		firstLineAddress: 'add',
		name: 'Esteban',
		postalCode: '1111',
		secondLineAddress: 'second line',
	});
	await expect(page).toHaveURL(/\/checkout\/success/);
});

test('should show an error message if credit card was declined', async ({
	page,
}) => {
	// checkout stripe
	const checkout = new CheckoutPage(page);
	await checkout.pay({
		cardNumber: '4000 0000 0000 0002',
		city: 'Bogota',
		country: 'Colombia',
		cvc: '123',
		department: 'Cundinamarca',
		email: 'test@gmail.com',
		expirationDate: '0631',
		firstLineAddress: 'add',
		name: 'Esteban',
		postalCode: '1111',
		secondLineAddress: 'second line',
	});
	await expect(
		page.getByText(
			'Your credit card was declined. Try paying with a debit card instead.',
		),
	).toBeVisible();
});

test('should redirect to /checkout/cancel if payment was not success', async ({
	page,
}) => {
	// checkout stripe
	const checkout = new CheckoutPage(page);
	await checkout.pay({
		cardNumber: '4000 0000 0000 0119',
		city: 'Bogota',
		country: 'Colombia',
		cvc: '123',
		department: 'Cundinamarca',
		email: 'test@gmail.com',
		expirationDate: '0631',
		firstLineAddress: 'add',
		name: 'Esteban',
		postalCode: '1111',
		secondLineAddress: 'second line',
	});
	await page
		.getByRole('link', { name: 'Back to Just for learning sandbox' })
		.click();

	await expect(page).toHaveURL(/\/checkout\/cancel/);
});
