import { getPdpUrl } from './utils';

describe('utils', () => {
	describe('getPdpUrl', () => {
		it('should add a param to a url', () => {
			const url = '/api/example';
			const color = 'red';

			expect(getPdpUrl(url, color)).toBe('/api/example?color=red');
		});
	});
});
