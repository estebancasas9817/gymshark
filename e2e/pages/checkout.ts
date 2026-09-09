import { Page } from '@playwright/test';

export class CheckoutPage {
	constructor(private page: Page) {}

	async goto() {
		await this.page.goto('/accessories/all-accessories');
	}

	// SHIPPING INFORMATION
	async fillEmail(email: string) {
		await this.page.getByPlaceholder('email@example.com').fill(email);
	}
	async fillCountry(country: string) {
		await this.page.getByLabel('Country or region').selectOption(country);
	}
	async fillFirstName(name: string) {
		await this.page.getByPlaceholder('Full name').fill(name);
	}

	async fillFirstlineAddress(address: string) {
		await this.page.getByPlaceholder('Address line 1').fill(address);
	}
	async fillSecondlineAddress(address: string) {
		await this.page.getByPlaceholder('Address line 2').fill(address);
	}

	async fillCity(city: string) {
		await this.page.getByPlaceholder('City').fill(city);
	}
	async fillDepartment(department: string) {
		await this.page.getByLabel('Department').selectOption(department);
	}
	async fillPostalCode(postalCode: string) {
		await this.page.getByPlaceholder('Postal Code').fill(postalCode);
	}

	// Payment methods
	async fillCardNumber(cardNumber: string) {
		await this.page.getByPlaceholder('1234 1234 1234 1234').fill(cardNumber);
	}

	async fillExpiration(expiration: string) {
		await this.page.getByPlaceholder('MM / YY').fill(expiration);
	}

	async fillCVC(cvc: string) {
		await this.page.getByPlaceholder('CVC').fill(cvc);
	}

	async submit() {
		await this.page.getByTestId('hosted-payment-submit-button').click();
	}

	async pay({
		email,
		name,
		firstLineAddress,
		secondLineAddress,
		city,
		postalCode,
		cardNumber,
		expirationDate,
		cvc,
		country,
		department,
	}: {
		email: string;
		name: string;
		firstLineAddress: string;
		secondLineAddress: string;
		city: string;
		postalCode: string;
		cardNumber: string;
		expirationDate: string;
		cvc: string;
		country: string;
		department: string;
	}) {
		await this.fillEmail(email);
		await this.fillCountry(country);
		await this.fillFirstName(name);
		await this.fillFirstlineAddress(firstLineAddress);
		await this.fillSecondlineAddress(secondLineAddress);
		await this.fillCity(city);
		await this.fillDepartment(department);
		await this.fillPostalCode(postalCode);
		await this.fillCardNumber(cardNumber);
		await this.fillExpiration(expirationDate);
		await this.fillExpiration(expirationDate);
		await this.fillCVC(cvc);
		await this.submit();
	}
}
