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
		setZoom((prev) => ({
			...prev,
			isZoomed: prev.imgPosition === index ? !prev.isZoomed : true,
			imgPosition: index,
			mouseX: e.clientX,
			mouseY: e.clientY,
		}));
	};

	return (
		<div className="basis-1/2 relative h-260">
			<div
				className="overflow-y-auto scroll-smooth h-full"
				ref={scrollContainerRef}
			>
				<div
					className={cn(
						'grid grid-cols-2 gap-1',
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
									'relative overflow-hidden bg-gray-100 aspect-square',
									isMainImage && 'col-span-2 aspect-4/5',
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
									// sizes={
									// 	isMainImage
									// 		? '(min-width: 768px) 50vw, 100vw'
									// 		: '(min-width: 768px) 25vw, 50vw'
									// }
									sizes="100vw"
									className={cn(
										'object-cover transition-transform duration-300 ease-out',
										shouldZoom ? 'scale-[2.5]' : 'scale-100',
									)}
									quality={100}
									style={{
										transformOrigin: shouldZoom
											? `${zoom.x}% ${zoom.y}%`
											: 'center',
									}}
									priority={index < 2}
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
