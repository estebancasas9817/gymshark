'use client';

import Image from 'next/image';
import logo from '../../public/logo.jpg';
import {
	ChevronRight,
	Heart,
	Search,
	ShoppingBag,
	UserRound,
} from 'lucide-react';
import { Stack } from '@/components/layout/stack';
import Link from 'next/link';
import { Conditional } from '@/components/layout/conditional';
import { useEffect, useRef, useState } from 'react';
import { NavigationItem } from '@/types/navigationCategory';
import { cn } from '@/utils/cn/cn';
import { SideMegaMenu } from './side-mega-menu';
import { usePathname } from 'next/navigation';

interface HeaderProps {
	navigationlist: NavigationItem[];
}

export const Header = ({ navigationlist }: HeaderProps) => {
	const [menuIndex, setMenuIndex] = useState<number>(4);
	const shouldDisplayMenuRef = useRef<boolean>(false);
	const pathName = usePathname();
	const prevPathName = useRef(pathName);
	const menu = navigationlist[menuIndex];

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
					<Stack as="ul" direction="row" gap="lg" className="group/container">
						{navigationlist.map(({ id, href, label, order }) => (
							<li key={id}>
								<Link
									href={href}
									className={cn(
										'text-sm relative group block transition-colors duration-300 ',
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
				</Stack>
				<figure>
					<Link href={'/'}>
						<Image src={logo} alt="gymshark clone loge" priority width={150} />
					</Link>
				</figure>
				<Stack as="nav" direction="row" gap="xl" align="center">
					<Link href={''}>
						<Search size={20} />
					</Link>
					<Link href={''}>
						<Heart size={20} />
					</Link>
					<Link href={''}>
						<UserRound size={20} />
					</Link>
					<Link href={''}>
						<ShoppingBag size={20} />
					</Link>
				</Stack>
			</Stack>
			<Conditional test={shouldDisplayMenuRef.current}>
				<SideMegaMenu
					handleOnMouseLeave={handleOnMouseLeave}
					menu={menu?.categories}
				/>
			</Conditional>
		</>
	);
};
