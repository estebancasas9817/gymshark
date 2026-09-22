'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn/cn';
import styles from './gallery.module.css';
import { GalleryScroller } from '../gallery-scroller';
import { useRef, useState, MouseEvent, useEffect } from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { Stack } from '@/components/layout/stack';

interface GalleryProps {
	galleryImages: string[];
}

export const Gallery = ({ galleryImages }: GalleryProps) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const isMobile = !useBreakpoint('md');
	const [activeImage, setActiveImage] = useState(0);
	const [zoom, setZoom] = useState({
		isZoomed: false,
		imgPosition: -1,
		x: 50,
		y: 50,
		mouseX: 0,
		mouseY: 0,
	});

	const handleMouseMove = (e: MouseEvent<HTMLElement>, index: number) => {
		if (isMobile) return;

		const shouldZoom = zoom.isZoomed && index === zoom.imgPosition;
		if (!zoom.isZoomed || zoom.imgPosition !== index) return;

		const { left, top, width, height } =
			e.currentTarget.getBoundingClientRect();

		const x = ((e.clientX - left) / width) * 100;
		const y = ((e.clientY - top) / height) * 100;

		setZoom((prev) => ({
			...prev,
			isZoomed: shouldZoom,
			x,
			y,
			mouseX: e.clientX,
			mouseY: e.clientY,
		}));
	};

	const handleClick = (e: MouseEvent, index: number) => {
		if (isMobile) return;

		const { left, top, width, height } =
			e.currentTarget.getBoundingClientRect();

		const x = ((e.clientX - left) / width) * 100;
		const y = ((e.clientY - top) / height) * 100;

		setZoom((prev) => ({
			...prev,
			isZoomed: prev.imgPosition === index ? !prev.isZoomed : true,
			imgPosition: index,
			x,
			y,
			mouseX: e.clientX,
			mouseY: e.clientY,
		}));
	};

	useEffect(() => {
		const container = scrollContainerRef.current;

		if (!container) return;

		const slides = container.querySelectorAll<HTMLElement>(
			'[data-gallery-slide]',
		);

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleSlide = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (!visibleSlide) return;

				const index = Number(visibleSlide.target.getAttribute('data-index'));

				setActiveImage(index);
			},
			{
				root: container,
				threshold: 0.6,
			},
		);

		slides.forEach((slide) => observer.observe(slide));

		return () => observer.disconnect();
	}, [galleryImages]);

	return (
		<>
			<div className="flex-1 relative h-260">
				<div
					ref={scrollContainerRef}
					className="h-full overflow-x-auto scrollbar-none scroll-smooth lg:overflow-x-hidden lg:overflow-y-auto"
				>
					<div
						className={cn(
							'flex md:grid lg:grid-cols-2 lg:gap-1 w-full snap-x snap-mandatory overflow-x-auto scrollbar-none scroll-smooth lg:overflow-x-hidden lg:overflow-y-auto',
							zoom.isZoomed
								? styles['gallery-img-cursor-zoom-out']
								: styles['gallery-img-cursor-zoom-in'],
						)}
					>
						{galleryImages.map((imageUrl, index) => {
							const isMainImage = index === 2;
							const shouldZoom = zoom.isZoomed && index === zoom.imgPosition;

							return (
								<figure
									data-gallery-slide
									data-index={index}
									key={imageUrl}
									className={cn(
										'relative overflow-hidden bg-gray-100 w-full shrink-0 aspect-2/3 lg:w-auto lg:shrink snap-start snap-always',
										isMainImage && 'lg:col-span-2 lg:aspect-3/5',
									)}
									onMouseMove={(e) => handleMouseMove(e, index)}
									onClick={(e) => handleClick(e, index)}
								>
									<Image
										src={imageUrl.trim()}
										alt={`Product image ${index + 1}`}
										fill
										sizes="100vw"
										className={cn(
											'object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
											shouldZoom ? 'scale-[2]' : 'scale-100',
										)}
										quality={100}
										style={{
											transformOrigin: `${zoom.x}% ${zoom.y}%`,
										}}
										priority={index === 2}
									/>
								</figure>
							);
						})}
					</div>
				</div>

				<GalleryScroller scrollContainerRef={scrollContainerRef} />
			</div>
			<Stack direction="row" className="md:hidden mt-2" justify="center">
				{galleryImages.map((imageUrl, index) => (
					<div
						key={imageUrl}
						className={cn(
							'w-3 h-3 rounded-full bg-[#1b1b1b33]',
							activeImage === index && 'bg-primary',
						)}
					/>
				))}
			</Stack>
		</>
	);
};
