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
		...props
	}: {
		record_id: string;
		filename: string;
		collection: string;
		reveal?: boolean;
		nofade?: boolean;
	} & HTMLImgAttributes = $props();

	let loaded = $state(false);

	const src = $derived(`${PUBLIC_POCKETBASE_URL}/api/files/${collection}/${record_id}/${filename}`);
</script>

<img
	{src}
	loading="lazy"
	alt={props.alt || 'Media content'}
	class={[
		cx,
		'w-full object-cover transition duration-400',
		nofade || loaded ? 'opacity-100' : 'opacity-0',
		!loaded && reveal && 'translate-y-2 scale-105'
	]}
	onload={() => (loaded = true)}
	{...props}
/>
