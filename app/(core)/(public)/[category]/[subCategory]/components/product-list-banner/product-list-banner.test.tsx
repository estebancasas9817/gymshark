import { ProductListBanner } from './product-list-banner';
import { render, screen } from '@testing-library/react';

const renderComp = (imageUrl: string) => {
	render(<ProductListBanner imageUrl={imageUrl} />);
};

describe('ProductListBanner', () => {
	it('should display an image with fetchPriority and atributes', () => {
		renderComp('/image');
		const image = screen.getByAltText('image banner');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('fetchPriority', 'high');
	});
});
