'use client';

import Image from 'next/image';
import logo from '../../public/logo.jpg';
import { Stack } from '@/components/layout/stack';
import Link from 'next/link';
import { Conditional } from '@/components/layout/conditional';
import { useEffect, useRef, useState } from 'react';
import { NavigationItem } from '@/types/navigationCategory';
import { cn } from '@/utils/cn/cn';
import { SideMegaMenu } from './side-mega-menu';
import { usePathname } from 'next/navigation';
import { HeaderActions } from './header-actions';
import { MenuIcon, Search } from 'lucide-react';
import { SearchHeader } from './search-header';
import { CategoryTabs } from './category-tabs';
import { CategoryTab } from './category-tab';
import { NavigationMenuList } from './navigation-menu-list';
import { CategoryPromoCards } from './category-promo-cards';
import { PAYMENT_METHODS } from '../footer/footer-promos/constants';
import { PaymentMethods } from '@/components/ui/payment-methods';

interface HeaderProps {
	navigationlist: NavigationItem[];
}

export const Header = ({ navigationlist }: HeaderProps) => {
	const [menuIndex, setMenuIndex] = useState<number>(4);
	const [isOpen, setIsOpen] = useState(false);
	const shouldDisplayMenuRef = useRef<boolean>(false);
	const pathName = usePathname();
	const prevPathName = useRef(pathName);
	const menu = navigationlist[menuIndex];

	const handleToogleHeader = (type: 'open' | 'close') => {
		setIsOpen(type === 'open' ? true : false);
	};

	const handleOnMouseEnter = (index: number) => {
		setMenuIndex(index);
		shouldDisplayMenuRef.current = true;
	};

	const handleOnMouseLeave = () => {
		setMenuIndex(4);
		shouldDisplayMenuRef.current = false;
	};

	useEffect(() => {
		if (menuIndex !== 4 && pathName !== prevPathName.current) {
			setMenuIndex(4);
			shouldDisplayMenuRef.current = false;
			prevPathName.current = pathName;
		}
	});

	return (
		<>
			<Stack
				as="header"
				direction="row"
				align="center"
				justify="between"
				className="px-10 py-3.5 bg-secondary"
			>
				<Stack as="nav">
					<Stack
						as="ul"
						direction="row"
						gap="lg"
						className="hidden lg:flex group/container"
					>
						{navigationlist.map(({ id, href, label, order }) => (
							<li key={id}>
								<Link
									href={href}
									className={cn(
										'text-sm relative group block transition-colors duration-300',
										'group-hover/container:text-gray-400',
										'hover:text-black!',
										shouldDisplayMenuRef.current && 'text-primary',
									)}
									onMouseEnter={() => handleOnMouseEnter(order - 1)}
								>
									{label}
									<span className="absolute left-0 -bottom-2 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
								</Link>
							</li>
						))}
					</Stack>
					<Stack as="ul" direction="row" className="lg:hidden" align="center">
						<MenuIcon
							aria-label="hamburger menu"
							onClick={() => {
								setMenuIndex(0);
								handleToogleHeader('open');
							}}
						/>
						<Link href={''} aria-label="Search">
							<Search size={20} />
						</Link>
					</Stack>
				</Stack>
				<figure>
					<Link href={'/'}>
						<Image src={logo} alt="gymshark clone logo" priority width={150} />
					</Link>
				</figure>
				<HeaderActions />
			</Stack>
			<Conditional test={shouldDisplayMenuRef.current}>
				<SideMegaMenu
					handleOnMouseLeave={handleOnMouseLeave}
					menu={menu?.categories}
				/>
			</Conditional>

			{/* MOBILE VIEW */}
			<Conditional test={isOpen}>
				<div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm">
					<div
						className={cn(
							'flex h-screen w-full flex-col overflow-hidden rounded-t-2xl bg-secondary px-4 py-6 md:p-6 overflow-y-auto',
						)}
					>
						<SearchHeader handleToogleHeader={handleToogleHeader} />
						<CategoryTabs
							navigationlist={navigationlist}
							menuIndex={menuIndex}
							setMenuIndex={setMenuIndex}
						/>
						<CategoryPromoCards handleToogleHeader={handleToogleHeader} />
						<CategoryTab
							menu={menu?.categories}
							handleToogleHeader={handleToogleHeader}
						/>
						<NavigationMenuList />
						<Stack direction="row" as="ul" className="mt-12">
							{PAYMENT_METHODS.map(({ alt, src }) => (
								<li key={alt}>
									<PaymentMethods src={src} alt={alt} />
								</li>
							))}
						</Stack>
					</div>
				</div>
			</Conditional>
		</>
	);
};
