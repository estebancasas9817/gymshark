import { Page } from '@playwright/test';

export class Cart {
	constructor(private page: Page) {}

	async goto() {
		await this.page.goto('/accessories/all-accessories');
	}

	async hoverOverProduct(productName: string) {
		await this.page.getByAltText(productName).first().hover();
	}

	async clickSizeProduct(size: string) {
		await this.page
			.getByRole('button', {
				name: size,
			})
			.click();
	}

	async addToCart({
		productName,
		size,
	}: {
		productName: string;
		size: string;
	}) {
		await this.goto();
		await this.hoverOverProduct(productName);
		await this.clickSizeProduct(size);
	}
}
