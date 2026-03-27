// $lib/utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 150): T {
	let timer: ReturnType<typeof setTimeout> | undefined;
	return ((...args) => {
		if (!timer) fn(...args); // fire immediately on leading edge
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = undefined; // reset so next call fires immediately again
		}, delay);
	}) as T;
}
