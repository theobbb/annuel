<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	const { data, children } = $props();

	const { year } = $derived(data);

	const accent_color = $derived(year?.accent_color || 'black');

	const favicon_svg = $derived(
		`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <rect width="32" height="32" fill="${accent_color}" />
        </svg>
    `.trim()
	);

	const favicon_data_uri = $derived(`data:image/svg+xml;base64,${btoa(favicon_svg)}`);

	const accent_style = $derived(`
        :root {
            --color-accent: ${accent_color};
        }
    `);

	const og_image_url = $derived(
		year ? `${PUBLIC_POCKETBASE_URL}/api/files/years/${year.id}/${year.poster}?thumb=1200x630t` : ''
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon_data_uri} />
	{@html `<style>${accent_style}</style>`}

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Annuel de design {page.params.year}" />
	<meta
		property="og:description"
		content="Les projets des finissant.es de l’école de design de l’UQAM"
	/>
	{#if og_image_url}
		<meta property="og:image" content={og_image_url} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}
</svelte:head>

{@render children()}
