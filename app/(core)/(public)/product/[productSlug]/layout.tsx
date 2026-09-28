import { ReactNode } from 'react';

export default function ProductLayout({ children }: { children: ReactNode }) {
	return <div data-segment="product-display-page">{children}</div>;
}
