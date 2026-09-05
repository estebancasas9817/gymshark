import { Page } from '@playwright/test';

export class SignUpPage {
	constructor(private page: Page) {}

	async goto() {
		await this.page.goto('/sign-up');
	}

	async fillFirstName(name: string) {
		await this.page.getByLabel('First Name').fill(name);
	}

	async fillLastName(lastName: string) {
		await this.page.getByLabel('Last Name').fill(lastName);
	}

	async fillEmail(email: string) {
		await this.page.getByLabel('Email address*').fill(email);
	}

	async fillPassword(password: string) {
		await this.page.getByLabel('Password*').fill(password);
	}

	async submit() {
		await this.page.getByRole('button', { name: /CREATE ACCOUNT/i }).click();
	}

	async login({
		email,
		password,
		name,
		lastName,
	}: {
		email: string;
		password: string;
		name: string;
		lastName: string;
	}) {
		await this.goto();
		await this.fillFirstName(name);
		await this.fillLastName(lastName);
		await this.fillEmail(email);
		await this.fillPassword(password);
		await this.submit();
	}
}
