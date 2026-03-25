export type PageProps<
	T = Record<string, string>,
	S = Record<string, string | string[] | undefined>,
> = {
	params: Promise<T>;
	searchParams: Promise<S>;
};
