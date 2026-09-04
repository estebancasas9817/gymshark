import { test, expect } from '@playwright/test';
import { SignInPage } from './pages/sign-in.page';

test('Should display error labels if user does not exists in db', async ({
	page,
}) => {
	const signInPage = new SignInPage(page);
	await signInPage.login('test@gmail.com', 'pasword123');
	await expect(page.getByRole('alert').first()).toHaveText(
		'Wrong email or password',
	);
});
test('Should display error labels if user types in a wrong format email', async ({
	page,
}) => {
	const signInPage = new SignInPage(page);
	await signInPage.login('test@d', 'pasword123');
	await expect(page.getByRole('alert').first()).toHaveText(
		'The format of the email is not valid',
	);
});
test('Should display error labels if user types in a password with less than 3 characters', async ({
	page,
}) => {
	const signInPage = new SignInPage(page);
	await signInPage.login('test@gmail.com', '12');
	await expect(page.getByRole('alert').first()).toHaveText(
		'Password must have at least 3 characters',
	);
});

test('should sign in successfully', async ({ page }) => {
	const signInPage = new SignInPage(page);
	await signInPage.login('estebancasas9817@gmail.com', '12345678');

	await expect(page).toHaveURL('/account');
});
