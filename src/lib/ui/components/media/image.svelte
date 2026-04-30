<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		record_id,
		filename,
		collection,
		class: cx = '',
		reveal = false,
		nofade = false,
		// These are now required or have sensible empty defaults
		sizes,
		sizes_attr = '100vw',
		...props
	}: {
		record_id: string;
		filename: string;
		collection: string;
		reveal?: boolean;
		nofade?: boolean;
		sizes: string;
		sizes_attr?: string;
	} & HTMLImgAttributes = $props();

	let loaded = $state(false);

	const baseUrl = $derived(
		`${PUBLIC_POCKETBASE_URL}/api/files/${collection}/${record_id}/${filename}?format=webp`
	);

	const screens: Record<string, string> = {
		'@sm': '(min-width: 640px)',
		'@md': '(min-width: 768px)',
		'@lg': '(min-width: 1024px)',
		'@xl': '(min-width: 1280px)',
		'@2xl': '(min-width: 1536px)'
	};

	const parsed_sizes = $derived(
		sizes_attr
			.split(',')
			.map((part) => {
				const trimmed = part.trim();
				// Find the @token (e.g., @lg)
				const match = trimmed.match(/^(@\w+)\s+(.+)$/);

				if (match && screens[match[1]]) {
					return `${screens[match[1]]} ${match[2]}`;
				}
				return trimmed; // Return as-is if no token found (the default case)
			})
			.join(', ')
	);

	const srcset = $derived(
		sizes
			.split(',')
			.map((thumb) => {
				const width = thumb.trim().split('x')[0];
				return `${baseUrl}&thumb=${thumb.trim()} ${width}w`;
			})
			.join(', ')
	);
</script>

<img
	{srcset}
	sizes={parsed_sizes}
	loading="lazy"
	alt={props.alt || 'Media content'}
	class={[
		cx,
		'w-full object-cover transition duration-400',
		nofade || loaded ? 'opacity-100' : 'opacity-0',
		!loaded && reveal && 'translate-y-2 scale-105 opacity-0'
	]}
	onload={() => (loaded = true)}
	{...props}
/>
