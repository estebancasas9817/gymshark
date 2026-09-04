import { Page } from '@playwright/test';

export class SignInPage {
	constructor(private page: Page) {}

	async goto() {
		await this.page.goto('/sign-in');
	}

	async fillEmail(email: string) {
		await this.page.getByLabel('Email address*').fill(email);
	}

	async fillPassword(password: string) {
		await this.page.getByLabel('Password*').fill(password);
	}

	async submit() {
		await this.page.getByRole('button', { name: /LOG IN/i }).click();
	}

	async login(email: string, password: string) {
		await this.goto();
		await this.fillEmail(email);
		await this.fillPassword(password);
		await this.submit();
	}
}
