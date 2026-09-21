'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn/cn';
import styles from './gallery.module.css';
import { GalleryScroller } from '../gallery-scroller';
import { useRef, useState, MouseEvent } from 'react';

interface GalleryProps {
	galleryImages: string[];
}

export const Gallery = ({ galleryImages }: GalleryProps) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const [zoom, setZoom] = useState({
		isZoomed: false,
		imgPosition: -1,
		x: 50,
		y: 50,
		mouseX: 0,
		mouseY: 0,
	});

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
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

	return (
		<div className="basis-1/2 relative h-260">
			<div
				className="lg:overflow-y-auto scroll-smooth h-full"
				ref={scrollContainerRef}
			>
				<div
					className={cn(
						'grid grid-cols-1 lg:grid-cols-2 lg:gap-1',
						zoom.isZoomed
							? styles['gallery-img-cursor-zoom-out']
							: styles['gallery-img-cursor-zoom-in'],
					)}
				>
					{galleryImages.map((imageUrl, index) => {
						const isMainImage = index === 2;
						const shouldZoom = zoom.isZoomed && index === zoom.imgPosition;

						return (
							<div
								key={imageUrl}
								className={cn(
									'relative overflow-hidden bg-gray-100 aspect-2/3 lg:aspect-square',
									isMainImage && 'lg:col-span-2 lg:aspect-4/5',
								)}
								onMouseMove={(e) => handleMouseMove(e, index)}
								onMouseLeave={() =>
									setZoom((prev) => ({ ...prev, imgPosition: -1 }))
								}
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
							</div>
						);
					})}
				</div>
			</div>
			<GalleryScroller scrollContainerRef={scrollContainerRef} />
		</div>
	);
};
