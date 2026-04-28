<script lang="ts">
	const { data, children } = $props();

	const accent_color = $derived(data.year?.accent_color || 'black');

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
</script>

<svelte:head>
	<link rel="icon" href={favicon_data_uri} />
	{@html `<style>${accent_style}</style>`}
</svelte:head>

{@render children()}
