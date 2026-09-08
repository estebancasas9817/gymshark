import { Page } from '@playwright/test';

export class Wishlist {
	constructor(private page: Page) {}

	async goto() {
		await this.page.goto('/accessories/all-accessories');
	}

	async clickWishListButton(productName: string) {
		await this.page
			.getByRole('link', {
				name: productName,
			})
			.locator('+ button')
			.first()
			.click();
	}

	async addToWishList(productName: string) {
		await this.goto();
		await this.clickWishListButton(productName);
	}
}
