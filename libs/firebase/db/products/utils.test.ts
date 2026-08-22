import { normalizeSize, splitSlug } from './utils';

describe('utils', () => {
	describe('normalizeSize', () => {
		it('should return a normalized size', () => {
			expect(normalizeSize('s')).toBe('S');
		});
	});

	describe('splitSlug', () => {
		it('should split slug', () => {
			expect(splitSlug('id-example')).toStrictEqual(['id', 'example']);
		});
	});
});
