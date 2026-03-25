import { page } from '$app/state';

type ParamUpdates = Record<string, string | null>;

export function url_query_param(src: string, updates: ParamUpdates): string {
	const base = src.startsWith('/') ? page.url.origin : undefined;
	const url = new URL(src, base);

	for (const [key, value] of Object.entries(updates)) {
		if (value === null) url.searchParams.delete(key);
		else url.searchParams.set(key, value);
	}

	return url.toString();
}
