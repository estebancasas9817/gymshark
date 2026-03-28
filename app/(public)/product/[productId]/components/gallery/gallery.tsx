'use client';

import Image from 'next/image';
import { useProductDisplayContext } from '../../context/product-display-context';
import { cn } from '@/utils/cn/cn';
import styles from './gallery.module.css';
import { GalleryScroller } from '../gallery-scroller';
import { useRef, useState, MouseEvent } from 'react';

export const Gallery = () => {
	const {
		selectedVariant: { images },
	} = useProductDisplayContext();

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	// Guardamos estado de zoom, qué imagen y la posición del mouse
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

		// Calcular porcentaje para el transform-origin
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
		<div
			className="basis-1/2 overflow-y-auto h-250 relative scroll-smooth"
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
				{images.map((imageUrl, index) => {
					const isMainImage = index === 2;
					const shouldZoom = zoom.isZoomed && index === zoom.imgPosition;

					return (
						<div
							key={imageUrl}
							className={cn(
								'relative overflow-hidden bg-gray-100',
								isMainImage && 'col-span-2 h-225',
							)}
							onMouseMove={(e) => handleMouseMove(e, index)}
							onMouseLeave={() =>
								setZoom((prev) => ({ ...prev, imgPosition: -1 }))
							}
							onClick={(e) => handleClick(e, index)}
						>
							<Image
								src={imageUrl.trim()}
								alt={`Product image ${index}`}
								width={isMainImage ? 710 : 360}
								height={isMainImage ? 900 : 360}
								className={cn(
									'w-full h-full object-cover transition-transform duration-300 ease-out',
									shouldZoom ? 'scale-[2.5]' : 'scale-100',
								)}
								style={{
									transformOrigin: shouldZoom
										? `${zoom.x}% ${zoom.y}%`
										: 'center',
								}}
								priority={index < 4}
							/>
						</div>
					);
				})}
			</div>
			<GalleryScroller scrollContainerRef={scrollContainerRef} />
		</div>
	);
};
