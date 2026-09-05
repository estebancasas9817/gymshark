import { test, expect } from '@playwright/test';
import { SignUpPage } from './pages/sign-up.page';

test('should display an error message if the first name is too long', async ({
	page,
}) => {
	const signUp = new SignUpPage(page);
	await signUp.login({
		email: 'test@gmail.com',
		password: 'pasword123',
		name: 'name that is very very very long',
		lastName: 'casas',
	});

	await expect(page.getByRole('alert').first()).toHaveText(
		`The first name can't have more than 30 characters`,
	);
});

test('should display an error message if the password is too short', async ({
	page,
}) => {
	const signUp = new SignUpPage(page);
	await signUp.login({
		email: 'test@gmail.com',
		password: 'pa',
		name: 'name',
		lastName: 'casas',
	});

	await expect(page.getByRole('alert').first()).toHaveText(
		'Password must have at least 3 characters',
	);
});

test('should display an error message if the email is not in the right format', async ({
	page,
}) => {
	const signUp = new SignUpPage(page);
	await signUp.login({
		email: 'test@g',
		password: 'passs',
		name: 'name',
		lastName: 'casas',
	});

	await expect(page.getByRole('alert').first()).toHaveText(
		'The format of the email is not valid',
	);
});

test('should display a successfull message if sign up was succesfull', async ({
	page,
}) => {
	const testEmail = `test-${Date.now()}@test.com`;
	const signUp = new SignUpPage(page);
	await signUp.login({
		email: testEmail,
		password: 'passs',
		name: 'name',
		lastName: 'last name',
	});

	await expect(page.getByRole('alert').first()).toHaveText(
		'Please check your email to verify your account.',
	);
});
test('should display an error message if user already exists in DB', async ({
	page,
}) => {
	const signUp = new SignUpPage(page);
	await signUp.login({
		email: 'test@gmail.com',
		password: 'test@',
		name: 'name',
		lastName: 'last name',
	});

	await expect(page.getByRole('alert').first()).toHaveText(
		'User with that email already exists',
	);
});

test('should redirect to /sign-in if user clicks on log in button', async ({
	page,
}) => {
	const signUp = new SignUpPage(page);
	await signUp.goto();
	await page.getByRole('link', { name: 'Log in' }).click();
	await expect(page).toHaveURL('/sign-in');
});
