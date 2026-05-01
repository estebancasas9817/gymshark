import Image from 'next/image';
import logo from '../../public/logo.jpg';
import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import { Stack } from '@/components/layout/stack';
import Link from 'next/link';

export const Header = () => {
	return (
		<Stack
			as="header"
			direction="row"
			align="center"
			justify="between"
			className="px-10 py-3.5 bg-secondary"
		>
			<Stack as="nav">
				<Stack as="ul" direction="row" gap="lg">
					<li>
						<Link href={'/women'} className="text-sm">
							Women
						</Link>
					</li>
					<li>
						<Link href={'/men'} className="text-sm">
							Men
						</Link>
					</li>
					<li>
						<Link href={''} className="text-sm">
							Accesories
						</Link>
					</li>
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
	);
};
