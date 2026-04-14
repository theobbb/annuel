<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		record_id,
		filename,
		collection,
		class: cx = '',
		thumbnail,
		...props
	}: {
		record_id: string;
		filename: string;
		collection: string;
		thumbnail?: boolean;
	} & HTMLImgAttributes = $props();

	const baseUrl = `${PUBLIC_POCKETBASE_URL}/api/files/${collection}/${record_id}/${filename}?format=webp`;

	const sizes = thumbnail
		? { 300: '300x375', 500: '500x625' }
		: {
				400: '400x0',
				800: '800x0',
				1200: '1200x0'
			};

	const srcset = Object.entries(sizes)
		.map(([width, thumbParam]) => `${baseUrl}&thumb=${thumbParam} ${width}w`)
		.join(', ');

	//src="{PUBLIC_POCKETBASE_URL}/api/files/{collection}/{record_id}/{filename}?format=webp&thumb=300x375"
</script>

<img
	{srcset}
	sizes="(min-width: 1024px) 60vw, 100vw"
	loading="lazy"
	alt={props.alt || 'Media content'}
	{...props}
/>
