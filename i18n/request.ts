import { getRequestConfig } from 'next-intl/server';
import { messages } from '../libs/i18n/messages';

export default getRequestConfig(async () => {
	return {
		locale: 'en',
		messages,
	};
});
