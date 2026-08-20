import { capitalize } from './capitalize';

describe('capitalize', () => {
	it('should capitalize the first letter of a string', () => {
		const str = 'example';
		expect(capitalize(str)).toBe('Example');
	});
});
