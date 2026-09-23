import {
	FaDiscord,
	FaFacebookF,
	FaInstagram,
	FaPinterestP,
	FaTiktok,
	FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import VisaLogo from '@/public/visa.svg';
import AmericanExpressLogo from '@/public/amex.svg';
import MasterCardLogo from '@/public/mastercard.svg';
import ApplePayLogo from '@/public/apple-pay.svg';
import KlarnaLogo from '@/public/klarna.svg';
import AfterPayLogo from '@/public/afterpay.svg';
import PayPal from '@/public/paypal.svg';

export const PAYMENT_METHODS = [
	{ alt: 'visa logo', src: VisaLogo },
	{ alt: 'mastercard logo', src: MasterCardLogo },
	{ alt: 'paypal logo', src: PayPal },
	{ alt: 'apple pay logo', src: ApplePayLogo },
	{ alt: 'klarna logo', src: KlarnaLogo },
	{
		alt: 'american express logo',
		src: AmericanExpressLogo,
	},
	{ alt: 'afertpay logo', src: AfterPayLogo },
];

export const SOCIAL_LINKS = [
	{
		alt: 'discort',
		logo: <FaDiscord color="white" />,
		src: 'https://discord.gg/gymshark',
	},
	{
		alt: 'facebook',
		logo: <FaFacebookF color="white" />,
		src: 'https://www.facebook.com/GymShark',
	},
	{
		alt: 'pinterest',
		logo: <FaPinterestP color="white" />,
		src: 'https://www.pinterest.com/gymshark',
	},
	{
		alt: 'youtube',
		logo: <FaYoutube color="white" />,
		src: 'https://www.youtube.com/user/GymSharkTV',
	},
	{
		alt: 'instagram',
		logo: <FaInstagram color="white" />,
		src: 'https://www.instagram.com/gymshark',
	},
	{
		alt: 'x',
		logo: <FaXTwitter color="white" />,
		src: 'https://www.twitter.com/gymshark',
	},
	{
		alt: 'tiktok',
		logo: <FaTiktok color="white" />,
		src: 'https://www.tiktok.com/@gymshark',
	},
];

export const PROMO_LINKS = [
	{ label: 'Blog', url: 'https://row.gymshark.com/blog' },
	{
		label: 'Student Discount',
		url: 'https://row.gymshark.com/pages/studentbeans',
	},
	{ label: 'Register', url: '/sign-up' },
];
