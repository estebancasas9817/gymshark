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
		alt: 'discord',
		ariaLabel: 'Visit Gymshark on Discord',
		logo: <FaDiscord color="white" />,
		src: '#',
	},
	{
		alt: 'facebook',
		ariaLabel: 'Visit Gymshark on Facebook',
		logo: <FaFacebookF color="white" />,
		src: '#',
	},
	{
		alt: 'pinterest',
		ariaLabel: 'Visit Gymshark on Pinterest',
		logo: <FaPinterestP color="white" />,
		src: '#',
	},
	{
		alt: 'youtube',
		ariaLabel: 'Visit Gymshark on YouTube',
		logo: <FaYoutube color="white" />,
		src: '#',
	},
	{
		alt: 'instagram',
		ariaLabel: 'Visit Gymshark on Instagram',
		logo: <FaInstagram color="white" />,
		src: '#',
	},
	{
		alt: 'x',
		ariaLabel: 'Visit Gymshark on X (Twitter)',
		logo: <FaXTwitter color="white" />,
		src: '#',
	},
	{
		alt: 'tiktok',
		ariaLabel: 'Visit Gymshark on TikTok',
		logo: <FaTiktok color="white" />,
		src: '#',
	},
];

export const PROMO_LINKS = [
	{ label: 'Blog', url: '#' },
	{
		label: 'Student Discount',
		url: '#',
	},
	{ label: 'Register', url: '/sign-up' },
];
