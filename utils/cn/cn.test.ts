import { cn } from './cn';

describe('cn', () => {
	it('should merge multiple strings (classnames) into just 1', () => {
		const classNames = 'px-2';
		expect(cn('ps-10 mx-0 w-1/2 mt-4', classNames)).toBe(
			'ps-10 mx-0 w-1/2 mt-4 px-2',
		);
	});
	it('should not merge classNames if condition is false', () => {
		const classNames = 'px-2';
		expect(cn('ps-10 mx-0 w-1/2 mt-4', false && classNames)).toBe(
			'ps-10 mx-0 w-1/2 mt-4',
		);
	});
});
