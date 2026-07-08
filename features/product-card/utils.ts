export const getPdpUrl = (href: string, color: string): string => {
	return `${href}?color=${color.toLowerCase()}`;
};
