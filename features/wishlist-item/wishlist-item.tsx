'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Text } from '@/components/ui/text';
import { useWishlist } from '@/app/context/wishlist-context';
import { useCart } from '@/app/context/cart-context';
import { CartItemFull } from '@/libs/firebase/db/cart/get-cart';
import { Conditional } from '@/components/layout/conditional';

interface WishlistItemProps {
	productId: string;
	skuId: string;
	name: string;
	color: string;
	price: number;
	currency?: string;
	imageUrl: string;
	sizes: { size: string; stock: number }[];
}

export function WishlistItem({
	productId,
	skuId,
	name,
	color,
	price,
	currency = '$',
	imageUrl,
	sizes,
}: WishlistItemProps) {
	const { handleDeleteWishlist } = useWishlist();
	const { handleAddToCart, isPending } = useCart();
	const [selectedSize, setSelectedSize] = useState('');
	const [showSizeError, setShowSizeError] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close menu when clicking outside
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	function handleAddToBag({
		color,
		image: imageUrl,
		name,
		price,
		productId,
		skuId,
		quantity,
		size,
	}: CartItemFull) {
		if (!selectedSize) {
			setShowSizeError(true);
			return;
		}
		setShowSizeError(false);
		handleAddToCart({
			color,
			image: imageUrl,
			name,
			price,
			productId,
			skuId,
			quantity,
			size,
		});
	}

	function handleSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setSelectedSize(e.target.value);
		if (e.target.value) setShowSizeError(false);
	}

	return (
		<div className="flex gap-3 py-4 border-b border-gray-200 last:border-none">
			<div className="relative w-22.5 shrink-0 self-stretch">
				<Image
					src={imageUrl}
					alt={name}
					fill
					className="object-cover object-top"
					sizes="90px"
				/>
			</div>

			<div className="flex flex-col flex-1 gap-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<p className="text-sm font-semibold text-gray-900 leading-snug">
						{name}
					</p>

					<div className="relative shrink-0" ref={menuRef}>
						<button
							onClick={() => setMenuOpen((v) => !v)}
							aria-label="More options"
							className="p-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-hidden="true"
							>
								<circle cx="8" cy="2" r="1.5" />
								<circle cx="8" cy="8" r="1.5" />
								<circle cx="8" cy="14" r="1.5" />
							</svg>
						</button>

						{menuOpen && (
							<div className="absolute right-0 top-full mt-1 w-55 bg-white border border-gray-200 shadow-lg z-20 rounded-sm">
								<button
									onClick={() => {
										handleAddToBag({
											color,
											image: imageUrl,
											name,
											price,
											productId,
											size: selectedSize,
											skuId,
											quantity: 1,
										});
										setMenuOpen(false);
									}}
									className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										aria-hidden="true"
									>
										<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
										<line x1="3" y1="6" x2="21" y2="6" />
										<path d="M16 10a4 4 0 0 1-8 0" />
									</svg>
									Add to bag
								</button>
								<button
									onClick={() => {
										handleDeleteWishlist({
											color,
											image: imageUrl,
											name,
											price,
											productId,
											sizes,
											skuId,
										});
										setMenuOpen(false);
									}}
									className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-gray-50 transition-colors border-t border-gray-100 cursor-pointer"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										aria-hidden="true"
									>
										<polyline points="3 6 5 6 21 6" />
										<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
										<path d="M10 11v6M14 11v6" />
										<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
									</svg>
									<Text as="span" className="text-red-600">
										Remove from wishlist
									</Text>
								</button>
							</div>
						)}
					</div>
				</div>

				<p className="text-xs text-gray-500">{color}</p>
				<p className="text-sm font-semibold text-gray-900">
					{currency}
					{price}
				</p>

				<div className="flex items-center gap-2 mt-auto pt-1">
					<div className="flex-1">
						<div className="relative">
							<select
								value={selectedSize}
								onChange={handleSizeChange}
								className={`w-full appearance-none border px-3 py-2 text-sm bg-white pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
									showSizeError
										? 'border-red-500 focus:ring-red-500'
										: 'border-gray-300'
								}`}
							>
								<option value="">Size</option>
								{sizes?.map(({ size, stock }) => (
									<option key={size} value={size} disabled={stock === 0}>
										{size}
										{stock === 0 ? ' – Out of stock' : ''}
									</option>
								))}
							</select>
							<svg
								className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								aria-hidden="true"
							>
								<polyline points="2 4 6 8 10 4" />
							</svg>
						</div>

						{showSizeError && (
							<p className="text-xs text-red-500 mt-1 absolute">
								Please select a size
							</p>
						)}
					</div>

					<button
						onClick={() =>
							handleAddToBag({
								color,
								image: imageUrl,
								name,
								price,
								productId,
								size: selectedSize,
								skuId,
								quantity: 1,
							})
						}
						aria-label="Add to bag"
						className="shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all cursor-pointer"
					>
						<Conditional
							test={isPending}
							fallback={
								<>
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										aria-hidden="true"
									>
										<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
										<line x1="3" y1="6" x2="21" y2="6" />
										<path d="M16 10a4 4 0 0 1-8 0" />
									</svg>
								</>
							}
						>
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
						</Conditional>
					</button>
				</div>
			</div>
		</div>
	);
}
