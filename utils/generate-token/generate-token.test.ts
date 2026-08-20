import { generateToken } from './generate-token';

describe('generateToken', () => {
	it('should generate a token of length 64', () => {
		expect(generateToken()).toHaveLength(64);
	});

	it('should generate a string', () => {
		expect(generateToken()).toBeTypeOf('string');
	});
});
