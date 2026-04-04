<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';

	const { data, children } = $props();

	const favicon_svg = $derived(
		`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <rect width="32" height="32" fill="yellow" />
        </svg>
    `.trim()
	);

	const favicon_data_uri = $derived(`data:image/svg+xml;base64,${btoa(favicon_svg)}`);
</script>

<svelte:head>
	<link rel="icon" href={favicon_data_uri} />
	<title>Annuel de design 2026</title>
</svelte:head>

{@render children()}
