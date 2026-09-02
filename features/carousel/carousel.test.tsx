import { render, screen } from '@testing-library/react';
import { Carousel, Size } from './carousel';
import { useCarousel } from '@/app/(core)/(public)/product/[productSlug]/components/product-collection/use-carousel';
import userEvent from '@testing-library/user-event';

const defaultProps = {
	children: <div data-testid="children" />,
	sectionName: 'sectionName',
	className: undefined,
	childrenToShow: undefined,
	stackClassNames: undefined,
	size: 'lg' as Size,
	shouldDisplayCarouselButtons: true,
};

const mockHandleClickChevron = vi.fn();
vi.mock(
	'@/app/(core)/(public)/product/[productSlug]/components/product-collection/use-carousel',
);

const renderComp = (props = defaultProps) => {
	render(<Carousel {...props} />);
};

describe('Carousel', () => {
	beforeEach(() => {
		vi.mocked(useCarousel).mockReturnValue({
			handleClickChevron: mockHandleClickChevron,
			handleScroll: vi.fn(),
			scroll: { isScrollLeftMax: false, isScrollRightMax: false },
			ref: { current: null },
		});
	});
	it('should call handleClickChevron with param as left if user clicks on left action pill ', async () => {
		const user = userEvent.setup();
		renderComp();
		await user.click(screen.getAllByRole('button')[0]);
		expect(mockHandleClickChevron).toHaveBeenCalledWith('left');
	});

	it('should call handleClickChevron with param as right if user clicks on right action pill ', async () => {
		const user = userEvent.setup();
		renderComp();
		await user.click(screen.getAllByRole('button')[1]);
		expect(mockHandleClickChevron).toHaveBeenCalledWith('right');
	});

	it('should contain disabled attr as true if scroll.isScrollLeftMax is true ', () => {
		vi.mocked(useCarousel).mockReturnValue({
			handleClickChevron: mockHandleClickChevron,
			handleScroll: vi.fn(),
			scroll: { isScrollLeftMax: true, isScrollRightMax: false },
			ref: { current: null },
		});
		renderComp();

		expect(screen.getAllByRole('button')[0]).toHaveAttribute('disabled', '');
	});

	it('should contain disabled attr as true if scroll.isScrollRightMax is true ', () => {
		vi.mocked(useCarousel).mockReturnValue({
			handleClickChevron: mockHandleClickChevron,
			handleScroll: vi.fn(),
			scroll: { isScrollLeftMax: false, isScrollRightMax: true },
			ref: { current: null },
		});
		renderComp();

		expect(screen.getAllByRole('button')[1]).toHaveAttribute('disabled', '');
	});

	it('should display carousel buttons if shouldDisplayCarouselButtons is true', () => {
		renderComp();

		expect(screen.getAllByRole('button')).toHaveLength(2);
	});

	it('should not display carousel buttons if shouldDisplayCarouselButtons is false', () => {
		renderComp({ ...defaultProps, shouldDisplayCarouselButtons: false });

		expect(screen.queryAllByRole('button')).toHaveLength(0);
	});
});
