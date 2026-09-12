'use client';

import { useEffect, useState } from 'react';

const BREAKPOINTS = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

export function useBreakpoint(breakpoint: Breakpoint) {
	const [matches, setMatches] = useState<boolean | null>(null);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			`(min-width: ${BREAKPOINTS[breakpoint]})`,
		);

		const handleChange = () => {
			setMatches(mediaQuery.matches);
		};

		handleChange();

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [breakpoint]);

	return matches;
}
