'use client';

import { Variant } from '@/types/product';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';

type ProductDisplayContext = {
	selectedVariant: Variant;
	setSelectedVariant: Dispatch<SetStateAction<Variant>>;
};
interface ProductDisplayContextProviderProps {
	children: ReactNode;
	variant: Variant;
}
const ProductDisplayContext = createContext<ProductDisplayContext | null>(null);

export const ProductDisplayContextProvider = ({
	variant,
	children,
}: ProductDisplayContextProviderProps) => {
	const [selectedVariant, setSelectedVariant] = useState<Variant>(variant);
	const value = useMemo(() => {
		return { selectedVariant, setSelectedVariant };
	}, [variant]);

	return (
		<ProductDisplayContext.Provider value={value}>
			{children}
		</ProductDisplayContext.Provider>
	);
};

export const useProductDisplayContext = () => {
	const context = useContext(ProductDisplayContext);
	if (!context) {
		throw new Error(
			'useProductDisplay must be used within ProductDisplayProvider',
		);
	}

	return context;
};
